import { useQuery } from '@apollo/client'
import { FormattedMessage } from 'react-intl'

import {
  Button,
  Dialog,
  List,
  QueryError,
  Spacer,
  SpinnerBlock,
  TextIcon,
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
      spacing={[0, 8]}
      size={[null, '1.25rem']}
      bgColor="greyLighter"
      onClick={() => remove()}
    >
      <TextIcon size={12} color="greyDark" weight="medium">
        <FormattedMessage defaultMessage="Remove" id="G/yZLu" />
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
    return <SpinnerBlock />
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

  const AddEditorButton = () => (
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Add collaborator" id="nNLkZ8" />}
      onClick={toAddStep}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Manage Communities" id="0/iEw/" />
        }
        closeDialog={closeDialog}
        rightBtn={<AddEditorButton />}
      />

      <Dialog.Content noSpacing>
        <List>
          {tag.owner && (
            <List.Item>
              <UserDigest.Rich
                user={tag.owner}
                subtitle={
                  <FormattedMessage defaultMessage="Maintainer" id="eXDZGQ" />
                }
                spacing={[12, 16]}
                hasFollow={false}
              />
            </List.Item>
          )}

          {editors.map((editor) => (
            <List.Item key={editor.id}>
              <UserDigest.Rich
                user={editor}
                hasFollow={false}
                subtitle={
                  <FormattedMessage defaultMessage="Collaborator" id="P1AKC5" />
                }
                extraButton={
                  <RemoveButton remove={() => toRemoveStep(editor)} />
                }
                spacing={[12, 16]}
              />
            </List.Item>
          ))}
        </List>

        <Spacer size="sp16" />

        <Dialog.Content>
          <Dialog.Content.Message smUpAlign="center">
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="Collaborator can manage selected feed with you."
                id="KoR0wt"
              />

              {(isHavingNoneEditors || isReachingLimit) && (
                <p>
                  <FormattedMessage
                    defaultMessage="Every tag can have maximum {count} collaborators."
                    id="TAPLOf"
                    values={{
                      count: <span className={styles.count}> 4 </span>,
                    }}
                  />
                </p>
              )}

              {isAllowAdd && isHavingEditors && (
                <p>
                  <FormattedMessage
                    defaultMessage="You can add {count} more collaborators."
                    id="aKlTO2"
                    values={{
                      count: (
                        <span className={styles.count}> {4 - count} </span>
                      ),
                    }}
                  />
                </p>
              )}
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Spacer size="sp16" />
      </Dialog.Content>

      {isAllowAdd && (
        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              <AddEditorButton />
            </>
          }
        />
      )}
    </>
  )
}

export default TagEditorList
