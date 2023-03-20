import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Dialog, useDialogSwitch, useMutation } from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import { UpdateTagSettingMutation } from '~/gql/graphql'

interface Props {
  id: string
  isOwner?: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDialog = ({ id, isOwner, children }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [update, { loading }] =
    useMutation<UpdateTagSettingMutation>(UPDATE_TAG_SETTING)

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="resign as tag maintainer"
              description="src/components/Dialogs/TagLeaveDialog/index.tsx"
            />
          }
          closeDialog={closeDialog}
          closeTextId="cancel"
        />
        <Dialog.Message>
          <h3>
            <FormattedMessage defaultMessage="are you sure" description="" /> 😭
          </h3>
          <p>
            <FormattedMessage
              defaultMessage="After resignation, you will not be able to manage tags."
              description="src/components/Dialogs/TagLeaveDialog/index.tsx"
            />
          </p>
        </Dialog.Message>
        <Dialog.Footer>
          <Dialog.Footer.Button
            textColor="white"
            bgColor="red"
            loading={loading}
            onClick={async () => {
              const result = await update({
                variables: {
                  input: { id, type: isOwner ? 'leave' : 'leave_editor' },
                },
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
                        defaultMessage="Resignation Success"
                        description="src/components/Dialogs/TagLeaveDialog/index.tsx"
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
              defaultMessage="Confirm Resignation"
              description="src/components/Dialogs/TagLeaveDialog/index.tsx"
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
      </Dialog>
    </>
  )
}

export const TagLeaveDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
