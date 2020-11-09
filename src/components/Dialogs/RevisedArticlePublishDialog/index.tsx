import { Dialog, Translate, useDialogSwitch } from '~/components'

import styles from './styles.css'

interface Props {
  children?: ({ open }: { open: () => void }) => React.ReactNode
  onSave: () => Promise<void>
}

export const RevisedArticlePublishDialog = ({ children, onSave }: Props) => {
  const { show, open, close } = useDialogSwitch(false)
  const onPublish = async () => {
    onSave()
    close()
  }

  return (
    <>
      {children && children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close}>
        <Dialog.Header
          title={<Translate zh_hant="發布須知" zh_hans="發布须知" />}
          close={close}
          closeTextId="cancel"
        />
        <Dialog.Message align="left">
          <section className="message">
            <ul>
              <li>
                <Translate
                  zh_hant="修訂後的作品即將永久儲存至星際文件系統（IPFS）分布式節點中。新舊版本永存。"
                  zh_hans="修订后的作品即将永久储存至星际文件系统（IPFS）分布式节点中。新旧版本永存。"
                />
              </li>
              <li>
                <Translate
                  zh_hant="當前作品版本會直接覆蓋顯示，讀者只能看到當前版本，上一版本將在 Matters 站內被隱藏。"
                  zh_hans="当前作品版本会直接覆盖显示，读者只能看到当前版本，上一版本将在 Matters 站内被隐藏。"
                />
              </li>
            </ul>
          </section>
        </Dialog.Message>
        <Dialog.Footer>
          <Dialog.Footer.Button onClick={onPublish}>
            <Translate zh_hant="確認發布" zh_hans="确认发布" />
          </Dialog.Footer.Button>
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate zh_hant="返回修訂" zh_hans="返回修订" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
      <style jsx>{styles}</style>
    </>
  )
}
