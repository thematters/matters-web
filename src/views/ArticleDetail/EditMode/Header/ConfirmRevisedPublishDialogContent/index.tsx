import PUBLISH_IMAGE from '@/public/static/images/publish-1.svg'
import { Dialog, Translate } from '~/components'

import styles from './styles.module.css'

interface Props {
  onSave: () => Promise<void>
  onBack: () => void
  closeDialog: () => void
}

const ConfirmRevisedPublishDialogContent = ({
  onSave,
  onBack,
  closeDialog,
}: Props) => {
  const onPublish = async () => {
    onSave()
    closeDialog()
  }

  const SubmitButton = (
    <Dialog.Header.RightButton
      text={<Translate id="publish" />}
      onClick={onPublish}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="發布須知" zh_hans="發布须知" en="Notice" />}
        leftButton={<Dialog.Header.BackButton onClick={onBack} />}
        rightButton={SubmitButton}
      />

      <Dialog.Message align="left" type="info">
        <section className={styles['image-container']}>
          <div
            className={styles['image']}
            style={{ backgroundImage: `url(${PUBLISH_IMAGE})` }}
          />
        </section>

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
      </Dialog.Message>
    </>
  )
}

export default ConfirmRevisedPublishDialogContent
