import { useQuery } from '@apollo/react-hooks'

import {
  Button,
  Dialog,
  QueryError,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import TAG_MAINTAINERS from '~/components/GQL/queries/tagMaintainers'
import { TagMaintainersQuery } from '~/gql/graphql'

import styles from './styles.module.css'

/**
 * This a sub-component of <TagEditorDialog>. It shows editors of a tag, and
 * user can start to add or remove editors in this.
 *
 * Usage:
 *
 * ```tsx
 *   <TagEditorList
 *     id={id}
 *     closeDialog={() => {}}
 *     toAddStep={() => {}}
 *     toRemoveStep={() => {}}
 *   />
 * ```
 */
type TagMaintainersNodeTagEditor = NonNullable<
  NonNullable<TagMaintainersQuery['node'] & { __typename: 'Tag' }>['editors']
>[0]

interface Props {
  id: string

  closeDialog: () => void
  toAddStep: () => void
  toRemoveStep: (editor: TagMaintainersNodeTagEditor) => void
}

const RemoveButton = ({ remove }: { remove: () => void }) => (
  <section>
    <Button
      spacing={[0, 'xtight']}
      size={[null, '1.25rem']}
      bgColor="grey-lighter"
      onClick={() => remove()}
    >
      <TextIcon size="xs" color="grey-dark" weight="md">
        <Translate zh_hant="移除" zh_hans="移除" en="remove" />
      </TextIcon>
    </Button>
  </section>
)

const TagEditorList = ({ id, closeDialog, toAddStep, toRemoveStep }: Props) => {
  const { data, loading, error } = useQuery<TagMaintainersQuery>(
    TAG_MAINTAINERS,
    {
      variables: { id },
    }
  )

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
  const isHavingNoneEditors = count === 0
  const isReachingLimit = count === 4

  return (
    <>
      <Dialog.Header
        title="tagManageEditor"
        closeDialog={closeDialog}
        closeTextId="cancel"
      />

      <Dialog.Content hasGrow>
        <section className={styles.owner}>
          {tag.owner && (
            <UserDigest.Rich
              user={tag.owner}
              hasDescriptionReplacement
              descriptionReplacement={
                <Translate zh_hant="主理人" zh_hans="主理人" en="maintainer" />
              }
              spacing={['tight', 'base']}
            />
          )}
        </section>

        {isHavingEditors && (
          <>
            <hr className={styles.divider} />
            <ul>
              {editors.map((editor) => (
                <li key={editor.id}>
                  <UserDigest.Rich
                    user={editor}
                    hasDescriptionReplacement
                    hasFollow={false}
                    descriptionReplacement={
                      <Translate
                        zh_hant="協作者"
                        zh_hans="协作者"
                        en="collaborator"
                      />
                    }
                    extraButton={
                      <RemoveButton remove={() => toRemoveStep(editor)} />
                    }
                    spacing={['tight', 'base']}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        <hr className={styles.divider} />

        <Dialog.Message>
          <p className={styles.hint}>
            <Translate
              zh_hant="協作者可以與你共同管理精選"
              zh_hans="协作者可以与你共同管理精选"
              en="Collaborator can manage selected feed with you."
            />
            <br />
            {(isHavingNoneEditors || isReachingLimit) && (
              <>
                <Translate
                  zh_hant="每個標籤最多添加"
                  zh_hans="每个标签最多添加"
                  en="Every tag can have maximum"
                />
                <span className={styles.count}> 4 </span>
                <Translate
                  zh_hant="名協作者"
                  zh_hans="名协作者"
                  en="collaborators."
                />
              </>
            )}
            {isAllowAdd && isHavingEditors && (
              <>
                <Translate
                  zh_hant="你還可以添加"
                  zh_hans="你还可以添加"
                  en="You can add"
                />
                <span className={styles.count}> {4 - count} </span>
                <Translate
                  zh_hant="名協作者"
                  zh_hans="名协作者"
                  en="more collaborators."
                />
              </>
            )}
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
            <Translate
              zh_hant="新增協作者"
              zh_hans="新增协作者"
              en="Add collaborator"
            />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      )}
    </>
  )
}

export default TagEditorList
