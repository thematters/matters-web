import { FormattedMessage } from 'react-intl'

import { Dialog, toast, Translate, useMutation } from '~/components'
import { updateTagMaintainers } from '~/components/GQL'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import { TagMaintainersQuery, UpdateTagSettingMutation } from '~/gql/graphql'

import styles from './styles.module.css'

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

  const onClick = async () => {
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

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Successfully removed collaborator"
          id="LnesNr"
        />
      ),
    })

    closeDialog()
  }

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Confirm collaborator removal"
            id="Hm2DAQ"
          />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="After removal, {user} user will not be able to manage selected feed."
              id="vLcHiG"
              values={{
                user: <span className={styles.name}>{editor.displayName}</span>,
              }}
            />
            <Translate
              zh_hant="移除後， "
              zh_hans="移除后， "
              en="After removal, "
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        closeDialog={closeDialog}
        btns={
          <Dialog.RoundedButton
            text={
              <FormattedMessage defaultMessage="Confirm Removal" id="1ZFwRz" />
            }
            color={loading ? 'green' : 'red'}
            onClick={onClick}
            loading={loading}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              <FormattedMessage defaultMessage="Confirm Removal" id="1ZFwRz" />
            }
            color={loading ? 'green' : 'red'}
            onClick={onClick}
            loading={loading}
          />
        }
      />
    </>
  )
}

export default TagRemoveEditor
