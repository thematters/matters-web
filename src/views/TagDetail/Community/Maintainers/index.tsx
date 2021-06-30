import { useQuery } from '@apollo/react-hooks'

import {
  Button,
  IconSettings24,
  QueryError,
  Spinner,
  TagEditorDialog,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
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
      {({ openDialog }) => (
        <Button
          size={['4rem', '1.5rem']}
          textColor="green"
          textActiveColor="white"
          bgActiveColor="green"
          borderColor="green"
          onClick={openDialog}
        >
          <TextIcon icon={<IconSettings24 />} weight="md" size={'xs'}>
            <Translate zh_hant="管理" zh_hans="管理" en="Manage" />
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

  if (data?.node?.__typename !== 'Tag') {
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
              <Translate zh_hant="主理人" zh_hans="主理人" en="maintainer" />
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
              <Translate zh_hant="協作者" zh_hans="協作者" en="collaborators" />
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
