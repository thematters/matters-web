import { Dialog, Form, Translate } from '~/components'

export type SettingsListDialogProps = {
  saving?: boolean

  gotoCover: () => any
  gotoTag: () => any
  gotoCollection: () => any
}

const SettingsList = ({
  saving,
  gotoCover,
  gotoTag,
  gotoCollection,
}: SettingsListDialogProps) => {
  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="設定" zh_hans="设定" en="Settings" />}
        close={close}
        closeTextId="close"
        mode="hidden"
      />

      <Dialog.Content hasGrow>
        <section className="container">
          <Form.List>
            <Form.List.Item
              title={
                <Translate
                  zh_hant="設定封面"
                  zh_hans="设定封面"
                  en="Set Cover"
                />
              }
              onClick={gotoCover}
            />
            <Form.List.Item
              title={
                <Translate
                  zh_hant="添加標籤"
                  zh_hans="添加标签"
                  en="Add Tags"
                />
              }
              onClick={gotoTag}
            />
            <Form.List.Item
              title={
                <Translate
                  zh_hant="關聯作品"
                  zh_hans="关联作品"
                  en="Set Collection"
                />
              }
              onClick={gotoCollection}
            />
          </Form.List>
        </section>
      </Dialog.Content>
    </>
  )
}

export default SettingsList
