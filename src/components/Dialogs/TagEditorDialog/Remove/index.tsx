import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Dialog, useMutation } from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import updateTagMaintainers from '~/components/GQL/updates/tagMaintainers'
import { TagMaintainersQuery, UpdateTagSettingMutation } from '~/gql/graphql'

import styles from './styles.css'

/**
 * This a sub-component of <TagEditorDialog>. It ask user to confirm
 * of removal of selected editor.
 *
 * Usage:
 *
 * ```tsx
 *   <TagRemoveEditor
 *     id={id}
 *     editor={''}
 *     closeDialog={() => {}}
 *   />
 * ```
 */

type TagMaintainersNodeTagEditor = NonNullable<
  NonNullable<TagMaintainersQuery['node'] & { __typename: 'Tag' }>['editors']
>[0]

interface Props {
  id: string
  editor: TagMaintainersNodeTagEditor

  closeDialog: () => void
}

const TagRemoveEditor = ({ id, editor, closeDialog }: Props) => {
  const [update, { loading }] =
    useMutation<UpdateTagSettingMutation>(UPDATE_TAG_SETTING)

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="confirm collaborator removal"
            description="src/components/Dialogs/TagEditorDialog/Remove/index.tsx"
          />
        }
        closeDialog={closeDialog}
        closeTextId="cancel"
      />

      <Dialog.Message>
        <p>
          <FormattedMessage
            defaultMessage="After removal, "
            description="src/components/Dialogs/TagEditorDialog/Remove/index.tsx"
          />
          <span className="name">{editor.displayName}</span>{' '}
          <FormattedMessage
            defaultMessage="user will not be able to manage selected feed."
            description="src/components/Dialogs/TagEditorDialog/Remove/index.tsx"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          bgColor="red"
          textColor="white"
          loading={loading}
          onClick={async () => {
            const result = await update({
              variables: {
                input: { id, type: 'remove_editor', editors: [editor.id] },
              },
              update: (cache) =>
                updateTagMaintainers({
                  cache,
                  id,
                  type: 'remove',
                  editors: [editor.id],
                }),
            })

            if (!result) {
              throw new Error('tag leave failed')
            }

            window.dispatchEvent(
              new CustomEvent(ADD_TOAST, {
                detail: {
                  color: 'green',
                  content: (
                    <FormattedMessage
                      defaultMessage="successfully removed collaborator"
                      description="src/components/Dialogs/TagEditorDialog/Remove/index.tsx"
                    />
                  ),
                  duration: 2000,
                },
              })
            )

            closeDialog()
          }}
        >
          <FormattedMessage
            defaultMessage="Confirm Removal"
            description="src/components/Dialogs/TagEditorDialog/Remove/index.tsx"
          />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          textColor="black"
          bgColor="grey-lighter"
          onClick={closeDialog}
        >
          <FormattedMessage defaultMessage="Cancel" description="" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
      <style jsx>{styles}</style>
    </>
  )
}

export default TagRemoveEditor
