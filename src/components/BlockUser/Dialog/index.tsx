import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import BLOCK_USER from '~/components/GQL/mutations/blockUser'

import { ADD_TOAST } from '~/common/enums'

import ViewBlocksButton from './ViewBlocksButton'

import { BlockUser } from '~/components/GQL/fragments/__generated__/BlockUser'
import { BlockUser as BlockUserMutate } from '~/components/GQL/mutations/__generated__/BlockUser'

interface BlockUserDialogProps {
  user: BlockUser
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BlockUserDialog = ({ user, children }: BlockUserDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const [blockUser] = useMutation<BlockUserMutate>(BLOCK_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      blockUser: {
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
          content: <Translate id="successBlock" />,
          customButton: <ViewBlocksButton />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
        <Dialog.Header title="changeUserName" close={close} headerHidden />

        <Dialog.Message
          headline="blockUser"
          description={
            <>
              <Translate
                zh_hant={`封鎖之後，${user.displayName} 將無法評論你的作品。`}
                zh_hans={`封锁之后，${user.displayName} 将无法评论你的作品。`}
              />

              <Translate
                zh_hant="你可以在設置裏管理你的封鎖用戶列表。"
                zh_hans="你可以在设置里管理你的封锁用户列表。"
              />
            </>
          }
        />

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onBlock()
              close()
            }}
          >
            <Translate id="block" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyBlockUserDialog = (props: BlockUserDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? <BlockUserDialog {...props} /> : <>{props.children({ open })}</>
    }
  </Dialog.Lazy>
)

export default LazyBlockUserDialog
