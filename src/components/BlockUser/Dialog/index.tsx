import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Dialog, useDialogSwitch, useMutation } from '~/components'
import TOGGLE_BLOCK_USER from '~/components/GQL/mutations/toggleBlockUser'
import {
  BlockUserPrivateFragment,
  BlockUserPublicFragment,
  ToggleBlockUserMutation,
} from '~/gql/graphql'

import ViewBlocksButton from './ViewBlocksButton'

interface BlockUserDialogProps {
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

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content:
            <FormattedMessage defaultMessage="User blocked. User now can't reply to your articles and user's comments have been hidden from you." description="src/components/BlockUser/Dialog/index.tsx" />,
          customButton: <ViewBlocksButton />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title="blockUser"
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <FormattedMessage defaultMessage="{displayName} won't be able to comment and collect your article. Besides, he or she can't @ you and subscribe your circle. You can manage blocked list in settings." description="src/components/BlockUser/Dialog/index.tsx"
              values={{
                displayName: user.displayName
              }} />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onBlock()
              closeDialog()
            }}
          >
            {/* has the same block text */}
            <FormattedMessage defaultMessage="Block User" description="src/components/BlockUser/Button/index.tsx" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <FormattedMessage defaultMessage="Cancel" description="src/components/BlockUser/Dialog/index.tsx" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
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
