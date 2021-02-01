import { useContext } from 'react'

import {
  Dialog,
  LanguageContext,
  Translate,
  useDialogSwitch,
} from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'
import { parseFormSubmitErrors } from '~/common/utils'

import { UNSUBSCRIBE_CIRCLE } from './gql'

import { UnsubscribeCircle } from './__generated__/UnsubscribeCircle'

interface BaseUnsubscribeCircleDialogProps {
  id: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseUnsubscribeCircleDialog = ({
  id,
  children,
}: BaseUnsubscribeCircleDialogProps) => {
  const { lang } = useContext(LanguageContext)
  const { show, open, close } = useDialogSwitch(true)

  const [unsubscribe, { loading, data }] = useMutation<UnsubscribeCircle>(
    UNSUBSCRIBE_CIRCLE,
    {
      variables: { id },
    }
  )
  const isMember = data?.unsubscribeCircle.isMember
  const isUnsubscribed = typeof isMember === 'boolean' && !isMember

  const onUnsubscribe = async () => {
    try {
      await unsubscribe()
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error, lang)

      if (!messages[codes[0]]) {
        return
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: messages[codes[0]],
          },
        })
      )
    }
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <Dialog.Header
          title={isUnsubscribed ? 'unsubscribed' : 'unsubscribeCircle'}
          close={close}
          mode="inner"
        />

        <Dialog.Message>
          {isUnsubscribed ? (
            <p>
              <Translate
                zh_hant="你已經與圍爐告別，感謝曾經的付出與參與。"
                zh_hans="你已经与围炉告别，感谢曾经的付出与参与。"
              />
              <br />
              <Translate
                zh_hant="去看看其他圍爐吧，希望你早日找到下一個心之所屬。"
                zh_hans="去看看其他围炉吧，希望你早日找到下一个心之所属。"
              />
            </p>
          ) : (
            <p>
              <Translate
                zh_hant="選擇離開圍爐，你將馬上失去成員資格。下一個賬單日（每月 1 日）將不會扣除費用。"
                zh_hans="选择离开围炉，你将马上失去成员资格。下一个账单日（每月 1 日）将不会扣除费用。"
              />
            </p>
          )}
        </Dialog.Message>

        <Dialog.Footer>
          {!isUnsubscribed && (
            <Dialog.Footer.Button
              bgColor="red"
              loading={loading}
              onClick={() => onUnsubscribe()}
            >
              <Translate zh_hant="轉身離開" zh_hans="转身离开" />
            </Dialog.Footer.Button>
          )}

          {!isUnsubscribed && (
            <Dialog.Footer.Button
              bgColor="grey-lighter"
              textColor="black"
              onClick={close}
            >
              <Translate zh_hant="等等再說" zh_hans="等等再说" />
            </Dialog.Footer.Button>
          )}

          {isUnsubscribed && (
            <Dialog.Footer.Button
              bgColor="grey-lighter"
              textColor="black"
              onClick={close}
            >
              <Translate id="close" />
            </Dialog.Footer.Button>
          )}
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export const UnsubscribeCircleDialog = (
  props: BaseUnsubscribeCircleDialogProps
) => (
  <Dialog.Lazy mounted={<BaseUnsubscribeCircleDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
