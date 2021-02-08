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
  children: ({ open }: { open: () => void }) => React.ReactNode
  isOwner?: boolean
}

const BaseDialog = ({ children, isOwner }: Props) => {
  const { show, open, close } = useDialogSwitch(true)

  const { getQuery } = useRoute()
  const id = getQuery('tagId')
  const [update, { loading }] = useMutation<UpdateTagSetting>(
    UPDATE_TAG_SETTING
  )

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close}>
        <Dialog.Header
          title={<Translate zh_hant="辭去權限" zh_hans="辞去权限" />}
          close={close}
          closeTextId="cancel"
        />
        <Dialog.Message>
          <h3>
            <Translate zh_hant="確定要這麼做嗎" zh_hans="确定要这么做吗" /> 😭
          </h3>
          <p>
            <Translate
              zh_hant="如果辭去權限，你將無法繼續管理標籤。"
              zh_hans="如果辞去权限，你将无法继续管理标签。"
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
                      />
                    ),
                    duration: 2000,
                  },
                })
              )

              close()
            }}
          >
            <Translate zh_hant="確認辭去" zh_hans="确认辞去" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            textColor="black"
            bgColor="grey-lighter"
            onClick={close}
          >
            <Translate zh_hant="取消" zh_hans="取消" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export const TagLeaveDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
