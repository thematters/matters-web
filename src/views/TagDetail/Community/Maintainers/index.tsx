import { useQuery } from '@apollo/react-hooks'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconSettings } from '@/public/static/icons/24px/settings.svg'
import {
  Button,
  Icon,
  QueryError,
  SpinnerBlock,
  TagEditorDialog,
  TextIcon,
  UserDigest,
} from '~/components'
import TAG_MAINTAINERS from '~/components/GQL/queries/tagMaintainers'
import { TagMaintainersQuery } from '~/gql/graphql'

import styles from '../styles.module.css'

interface Props {
  id: string
  isOwner?: boolean
}

const ManageButton = ({ id }: Props) => {
  return (
    <TagEditorDialog id={id}>
      {({ openDialog }) => (
        <Button
          spacing={['xtight', 'xtight']}
          textColor="green"
          textActiveColor="white"
          bgActiveColor="green"
          borderColor="green"
          onClick={openDialog}
          aria-haspopup="dialog"
        >
          <TextIcon icon={<Icon icon={IconSettings} />} weight="md" size={'xs'}>
            <FormattedMessage defaultMessage="Manage" id="0Azlrb" />
          </TextIcon>
        </Button>
      )}
    </TagEditorDialog>
  )
}

const Maintainers = ({ id, isOwner }: Props) => {
  const { data, loading, error } = useQuery<TagMaintainersQuery>(
    TAG_MAINTAINERS,
    {
      variables: { id },
      notifyOnNetworkStatusChange: true,
    }
  )

  if (loading) {
    return <SpinnerBlock />
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
          <section className={styles.category}>
            <section>
              <FormattedMessage defaultMessage="Maintainer" id="eXDZGQ" />
            </section>
            {isOwner && (
              <section>
                <ManageButton id={id} />
              </section>
            )}
          </section>
          <section>
            <UserDigest.Rich
              user={tag.owner}
              hasFollow={false}
              spacing={['tight', 0]}
            />
          </section>
        </>
      )}

      {isHavingEditors && (
        <>
          <section className={styles.category}>
            <section>
              <FormattedMessage defaultMessage="collaborators" id="dg3JCQ" />
              <span className={styles.count}>({editors.length})</span>
            </section>
          </section>
          <ul>
            {editors.map((editor) => (
              <li key={editor.id}>
                <UserDigest.Rich
                  user={editor}
                  hasFollow={false}
                  spacing={['tight', 0]}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default Maintainers
