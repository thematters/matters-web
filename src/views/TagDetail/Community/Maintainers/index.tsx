import { useQuery } from '@apollo/react-hooks'

import {
  Button,
  IconSettingsMedium,
  Spinner,
  TagEditorDialog,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'
import TAG_MAINTAINERS from '~/components/GQL/queries/tagMaintainers'

import styles from '../styles.css'

import { TagMaintainers } from '~/components/GQL/queries/__generated__/TagMaintainers'

interface Props {
  id: string

  isOwner: boolean
}

const ManageButton = () => {
  return (
    <TagEditorDialog>
      {({ open }) => (
        <Button
          size={['4rem', '1.5rem']}
          textColor="green"
          textActiveColor="white"
          bgActiveColor="green"
          borderColor="green"
          onClick={open}
        >
          <TextIcon icon={<IconSettingsMedium />} weight="md" size={'xs'}>
            <Translate zh_hant="管理" zh_hans="管理" />
          </TextIcon>
        </Button>
      )}
    </TagEditorDialog>
  )
}

const Maintainers = ({ id, isOwner }: Props) => {
  const { data, loading, error } = useQuery<TagMaintainers>(TAG_MAINTAINERS, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return null
  }

  const tag = data.node
  const editors = tag.editors || []

  const isHavingEditors = editors.length > 0

  return (
    <>
      {tag.owner && (
        <>
          <section className="category">
            <section>
              <Translate zh_hant="主理人" zh_hans="主理人" />
            </section>
            {isOwner && (
              <section>
                <ManageButton />
              </section>
            )}
          </section>
          <section>
            <UserDigest.Rich
              user={tag.owner}
              hasFollow={false}
              spacing={['tight', 'base']}
            />
          </section>
        </>
      )}

      {isHavingEditors && (
        <>
          <section className="category">
            <section>
              <Translate zh_hant="協作者" zh_hans="協作者" />
              <span className="count">({editors.length})</span>
            </section>
          </section>
          <ul>
            {editors.map((editor) => (
              <li key={editor.id}>
                <UserDigest.Rich
                  user={editor}
                  hasFollow={false}
                  spacing={['tight', 'base']}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      <style jsx>{styles}</style>
    </>
  )
}

export default Maintainers
