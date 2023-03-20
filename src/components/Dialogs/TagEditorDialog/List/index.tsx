import { useQuery } from '@apollo/react-hooks'
import { FormattedMessage } from 'react-intl'

import {
  Button,
  Dialog,
  QueryError,
  Spinner,
  TextIcon,
  UserDigest,
} from '~/components'
import TAG_MAINTAINERS from '~/components/GQL/queries/tagMaintainers'
import { TagMaintainersQuery } from '~/gql/graphql'

import styles from './styles.css'

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
        <FormattedMessage
          defaultMessage="remove"
          description="src/components/Dialogs/TagEditorDialog/List/index.tsx"
        />
      </TextIcon>
    </Button>
    <style jsx>{styles}</style>
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
        <section className="owner">
          {tag.owner && (
            <UserDigest.Rich
              user={tag.owner}
              hasDescriptionReplacement
              descriptionReplacement={
                <FormattedMessage defaultMessage="Maintainer" description="" />
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
                      <FormattedMessage
                        defaultMessage="collaborators"
                        description=""
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

        <hr className="divider" />

        <Dialog.Message>
          <p className="hint">
            <FormattedMessage
              defaultMessage="Collaborator can manage selected feed with you."
              description="src/components/Dialogs/TagEditorDialog/List/index.tsx"
            />
            <br />
            {(isHavingNoneEditors || isReachingLimit) && (
              <>
                <FormattedMessage
                  defaultMessage="Every tag can have maximum"
                  description="src/components/Dialogs/TagEditorDialog/List/index.tsx"
                />
                <span className="count"> 4 </span>
                <FormattedMessage
                  defaultMessage="collaborators."
                  description="src/components/Dialogs/TagEditorDialog/List/index.tsx"
                />
              </>
            )}
            {isAllowAdd && isHavingEditors && (
              <>
                <FormattedMessage
                  defaultMessage="You can add"
                  description="src/components/Dialogs/TagEditorDialog/List/index.tsx"
                />
                <span className="count"> {4 - count} </span>
                <FormattedMessage
                  defaultMessage="more collaborators."
                  description="src/components/Dialogs/TagEditorDialog/List/index.tsx"
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
            <FormattedMessage
              defaultMessage="Add collaborator"
              description="src/components/Dialogs/TagEditorDialog/List/index.tsx"
            />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

export default TagEditorList
