import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  LanguageContext,
  toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import { UpdateTagSettingMutation } from '~/gql/graphql'

interface Props {
  id: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const texts = {
  zh_hans:
    '当你认领标签后，即刻成为该标签的主理人。' +
    '你将可以为标签设置封面，编辑描述，并添加作品至精选列表。' +
    '你主理的标签可以用作文集、策展，也可以变成圈子、小组、讨论区等，更多主理人玩法等你发掘！',
  zh_hant:
    '當你認領標籤後，即刻成為該標籤的主理人。' +
    '你將可以為標籤設置封面，編輯描述，並添加作品至精選列表。' +
    '你主理的標籤可以用作文集、策展，也可以變成圈子、小組、討論區等，更多主理人玩法等你發掘！',
  en:
    'After adopting the tag, you become the maintainer of it.' +
    ' You can set the cover and description of the tag, and add works to selected feed. ' +
    ' You can use it for writing collection, curation, or subcommunity and group discussions, be creative and discover new usages!',
}

const BaseDialog = ({ id, children }: Props) => {
  const { lang } = useContext(LanguageContext)
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [update, { loading }] =
    useMutation<UpdateTagSettingMutation>(UPDATE_TAG_SETTING)

  const onClick = async () => {
    const result = await update({
      variables: { input: { id, type: 'adopt' } },
    })

    if (!result) {
      throw new Error('tag adoption failed')
    }

    toast.success({
      message: <FormattedMessage defaultMessage="Adopted" id="P2Btra" />,
    })
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Adopt Tag" id="Uv0hqn" />}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>{texts[lang]}</p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          closeText={
            <FormattedMessage
              defaultMessage="Let me think about it"
              id="IjNYll"
            />
          }
          btns={
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Maintain immediately"
                  id="a3j20X"
                />
              }
              loading={loading}
              onClick={onClick}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Maintain immediately"
                  id="a3j20X"
                />
              }
              loading={loading}
              onClick={onClick}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const TagAdoptionDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
