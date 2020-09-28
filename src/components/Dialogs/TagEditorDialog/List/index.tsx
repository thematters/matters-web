import { useQuery } from '@apollo/react-hooks'

import {
  Button,
  Dialog,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'
import TAG_MAINTAINERS from '~/components/GQL/queries/tagMaintainers'

import styles from './styles.css'

import { TagMaintainers } from '~/components/GQL/queries/__generated__/TagMaintainers'

/**
 * This a sub-component of <TagEditorDialog>. It shows editors of a tag, and
 * user can start to add or remove editors in this.
 *
 * Usage:
 *
 * ```tsx
 *   <TagEditorList
 *     id={id}
 *     close={() => {}}
 *     toAddStep={() => {}}
 *     toRemoveStep={() => {}}
 *   />
 * ```
 */
interface Props {
  id: string

  close: () => void
  toAddStep: () => void
  toRemoveStep: (editor: string) => void
}

const RemoveButton = ({ remove }: { remove: (editor: string) => void }) => (
  <section>
    <Button
      spacing={[0, 'xtight']}
      size={[null, '1.25rem']}
      bgColor="grey-lighter"
      onClick={remove}
    >
      <TextIcon size="xs" color="grey-dark" weight="md">
        <Translate zh_hant="移除" zh_hans="移除" />
      </TextIcon>
    </Button>
    <style jsx>{styles}</style>
  </section>
)

const TagEditorList = ({ id, close, toAddStep, toRemoveStep }: Props) => {
  const { data, loading, error } = useQuery<TagMaintainers>(TAG_MAINTAINERS, {
    variables: { id },
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const tag = data?.node?.__typename === 'Tag' && data?.node

  if (!tag) {
    return null
  }

  const editors = tag.editors || []
  const count = editors.length
  const isAllowAdd = count < 4
  const isHavingEditors = count > 0

  return (
    <>
      <Dialog.Header
        title="tagManageEditor"
        close={close}
        closeTextId="cancel"
      />

      <Dialog.Content hasGrow>
        <section className="owner">
          {tag.owner && (
            <UserDigest.Rich
              user={tag.owner}
              hasDescriptionReplacement
              descriptionReplacement={
                <Translate zh_hant="主理人" zh_hans="主理人" />
              }
              spacing={['tight', 'base']}
            />
          )}
        </section>

        {isHavingEditors && (
          <>
            <hr className="divider" />
            <ul>
              {editors.map((editor) => (
                <li key={editor.id}>
                  <UserDigest.Rich
                    user={editor}
                    hasDescriptionReplacement
                    hasFollow={false}
                    descriptionReplacement={
                      <Translate zh_hant="協作者" zh_hans="协作者" />
                    }
                    extraButton={
                      <RemoveButton remove={() => toRemoveStep(editor.id)} />
                    }
                    spacing={['tight', 'base']}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        <hr className="divider" />

        <Dialog.Message>
          <p className="hint">
            <Translate
              zh_hant="協作者可以與你共同管理「精選」每個標籤最多添加"
              zh_hans="协作者可以与你共同管理「精选」每个标签最多添加"
            />
            <span className="count">
              {' '}
              {count}
              {'/4 '}
            </span>
            <Translate zh_hant="名協作者" zh_hans="名协作者" />
          </p>
        </Dialog.Message>
      </Dialog.Content>

      {isAllowAdd && (
        <Dialog.Footer>
          <Dialog.Footer.Button
            textColor="white"
            bgColor="green"
            onClick={toAddStep}
          >
            <Translate zh_hant="新增協作者" zh_hans="新增协作者" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

export default TagEditorList
