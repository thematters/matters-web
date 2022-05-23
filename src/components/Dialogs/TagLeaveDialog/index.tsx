import {
  Dialog,
  Translate,
  useDialogSwitch,
  useMutation,
  useRoute,
} from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'

import { ADD_TOAST } from '~/common/enums'

import { UpdateTagSetting } from '~/components/GQL/mutations/__generated__/UpdateTagSetting'

interface Props {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  isOwner?: boolean
}

const BaseDialog = ({ children, isOwner }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { getQuery } = useRoute()
  const id = getQuery('tagId')
  const [update, { loading }] =
    useMutation<UpdateTagSetting>(UPDATE_TAG_SETTING)

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              zh_hant="辭去權限"
              zh_hans="辞去权限"
              en="resign as tag maintainer"
            />
          }
          closeDialog={closeDialog}
          closeTextId="cancel"
        />
        <Dialog.Message>
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
                      <Translate
                        zh_hant="辭去權限成功"
                        zh_hans="辞去权限成功"
                        en="Resignation Success"
                      />
                    ),
                    duration: 2000,
                  },
                })
              )

              closeDialog()
            }}
          >
            <Translate
              zh_hant="確認辭去"
              zh_hans="确认辞去"
              en="Confirm Resignation"
            />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            textColor="black"
            bgColor="grey-lighter"
            onClick={closeDialog}
          >
            <Translate zh_hant="取消" zh_hans="取消" en="cancel" />
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
