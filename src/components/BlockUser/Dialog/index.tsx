import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
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

    toast.success({
      message: <Translate id="successBlock" />,
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

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Block User" id="vAc1Bw" />}
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant={`封鎖之後，${user.displayName} 將無法評論、關聯你的作品，不能 @ 你，並且不能加入你的圍爐。你可以在設置裏管理你的封鎖用戶列表。`}
              zh_hans={`封锁之后，${user.displayName} 将无法评论、关联你的作品，不能 @ 你，并且不能加入你的围炉。你可以在设置里管理你的封锁用户列表。`}
              en={`${user.displayName} won't be able to comment and collect your article. Besides, he or she can't @ you and subscribe your circle. You can manage blocked list in settings.`}
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<Translate id="block" />}
              color="red"
              onClick={() => {
                onBlock()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<Translate id="block" />}
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
