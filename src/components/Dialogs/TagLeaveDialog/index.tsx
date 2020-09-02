import { useRouter } from 'next/router'
import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'

import { ADD_TOAST } from '~/common/enums'
import { getQuery } from '~/common/utils'

import { UpdateTagSetting } from '~/components/GQL/mutations/__generated__/UpdateTagSetting'

interface Props {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseDialog = ({ children }: Props) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const router = useRouter()
  const id = getQuery({ router, key: 'tagId' })
  const [update, { loading }] = useMutation<UpdateTagSetting>(
    UPDATE_TAG_SETTING
  )

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close}>
        <Dialog.Header
          title={<Translate zh_hant="離開標籤" zh_hans="离开标签" />}
          close={close}
          closeTextId="cancel"
        />
        <Dialog.Message>
          <h3>
            <Translate zh_hant="確定要這麼做嗎" zh_hans="确定要这么做吗" /> 😭
          </h3>
          <p>
            <Translate
              zh_hant="如果離開標籤，你將無法繼續管理標籤。"
              zh_hans="如果离开标签，你将无法继续管理标签。"
            />
          </p>
        </Dialog.Message>
        <Dialog.Footer>
          <Dialog.Footer.Button
            textColor="white"
            bgColor="red"
            loading={loading}
            onClick={async () => {
              try {
                const result = await update({
                  variables: { input: { id, type: 'leave' } },
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
                          zh_hant="離開標籤成功"
                          zh_hans="离开标签成功"
                        />
                      ),
                      duration: 2000,
                    },
                  })
                )

                close()
              } catch (error) {
                throw error
              }
            }}
          >
            <Translate zh_hant="確認離開" zh_hans="确认离开" />
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
