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
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const textZhHant =
  '當你認領標籤後，即刻成為該標籤的主理人。' +
  '你將可以為標籤設置封面，編輯描述，並添加作品至精選列表。' +
  '你主理的標籤可以用作文集、策展，也可以變成圈子、小組、討論區等，更多主理人玩法等你發掘！'

const textZhHans =
  '当你认领标签后，即刻成为该标签的主理人。' +
  '你将可以为标签设置封面，编辑描述，并添加作品至精选列表。' +
  '你主理的标签可以用作文集、策展，也可以变成圈子、小组、讨论区等，更多主理人玩法等你发掘！'

const textEn =
  'After adopting the tag, you become the maintainer of it.' +
  ' You can set the cover and description of the tag, and add works to selected feed. ' +
  ' You can use it for writing collection, curation, or subcommunity and group discussions, be creative and discover new usages!'

const BaseDialog = ({ id, children }: Props) => {
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
      message: <Translate zh_hant="認領成功" zh_hans="认领成功" />,
    })
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate zh_hant="認領標籤" zh_hans="认领标签" en="Adopt Tag" />
          }
        />

        <Dialog.Message>
          <p>
            <Translate zh_hant={textZhHant} zh_hans={textZhHans} en={textEn} />
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          closeText={
            <Translate
              zh_hant="考慮一下"
              zh_hans="考虑一下"
              en="Let me think about it"
            />
          }
          btns={
            <Dialog.RoundedButton
              text={
                <Translate
                  zh_hant="即刻主理"
                  zh_hans="即刻主理"
                  en="Maintain immediately"
                />
              }
              loading={loading}
              onClick={onClick}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <Translate
                  zh_hant="即刻主理"
                  zh_hans="即刻主理"
                  en="Maintain immediately"
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
