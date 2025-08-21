import { FormattedMessage } from 'react-intl'

import { PATHS, TEST_ID } from '~/common/enums'
import {
  Dialog,
  toast,
  Translate,
  useDialogSwitch,
  useMutation,
} from '~/components'
import TOGGLE_BLOCK_USER from '~/components/GQL/mutations/toggleBlockUser'
import {
  BlockUserPrivateFragment,
  BlockUserPublicFragment,
  ToggleBlockUserMutation,
} from '~/gql/graphql'

export interface BlockUserDialogProps {
  user: BlockUserPublicFragment & Partial<BlockUserPrivateFragment>
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BlockUserDialog = ({ user, children }: BlockUserDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [blockUser] = useMutation<ToggleBlockUserMutation>(TOGGLE_BLOCK_USER, {
    variables: { id: user.id, enabled: true },
    optimisticResponse: {
      toggleBlockUser: {
        id: user.id,
        isBlocked: true,
        __typename: 'User',
      },
    },
  })

  const onBlock = async () => {
    await blockUser()

    toast.info({
      message: (
        <FormattedMessage
          defaultMessage="User blocked. User now can't reply to your articles and user's comments have been hidden from you."
          id="2w2mhG"
        />
      ),
      actions: [
        {
          content: <Translate zh_hant="查看" zh_hans="查看" />,
          htmlHref: PATHS.ME_SETTINGS_BLOCKED,
        },
      ],
    })
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_BLOCK_USER}
      >
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Block User" id="vAc1Bw" />}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="{displayName} won't be able to comment your article. Besides, he or she can't @ you and subscribe your circle. You can manage blocked list in settings."
                id="Z39z+x"
                values={{ displayName: user.displayName }}
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Block" id="Up5U7K" />}
              color="red"
              onClick={() => {
                onBlock()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Block" id="Up5U7K" />}
              color="red"
              onClick={() => {
                onBlock()
                closeDialog()
              }}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyBlockUserDialog = (props: BlockUserDialogProps) => (
  <Dialog.Lazy mounted={<BlockUserDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyBlockUserDialog
