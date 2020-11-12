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
                  zh_hant="修訂發布後，站內將僅顯示修訂後作品，暫不提供草稿或其他方式回顧過往文字，請自行備份留存喔。"
                  zh_hans="修订发布后，站内将仅显示修订后作品，暂不提供草稿或其他方式回顾过往文字，请自行备份留存喔。"
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
