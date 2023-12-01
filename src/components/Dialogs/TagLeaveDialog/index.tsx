import {
  Dialog,
  toast,
  Translate,
  useDialogSwitch,
  useMutation,
} from '~/components'
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

  const onClick = async () => {
    const result = await update({
      variables: {
        input: { id, type: isOwner ? 'leave' : 'leave_editor' },
      },
    })

    if (!result) {
      throw new Error('tag leave failed')
    }

    toast.success({
      message: (
        <Translate
          zh_hant="辭去權限成功"
          zh_hans="辞去权限成功"
          en="Resignation Success"
        />
      ),
    })

    closeDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              zh_hant="辭去權限"
              zh_hans="辞去权限"
              en="resign as tag maintainer"
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <h3>
              <Translate
                zh_hant="確定要這麼做嗎"
                zh_hans="确定要这么做吗"
                en="are you sure"
              />{' '}
              😭
            </h3>
            <p>
              <Translate
                zh_hant="如果辭去權限，你將無法繼續管理標籤。"
                zh_hans="如果辞去权限，你将无法继续管理标签。"
                en="After resignation, you will not be able to manage tags."
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                <Translate
                  zh_hant="確認辭去"
                  zh_hans="确认辞去"
                  en="Confirm Resignation"
                />
              }
              color={loading ? 'green' : 'red'}
              onClick={onClick}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <Translate
                  zh_hant="確認辭去"
                  zh_hans="确认辞去"
                  en="Confirm Resignation"
                />
              }
              color={loading ? 'green' : 'red'}
              onClick={onClick}
              loading={loading}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const TagLeaveDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
