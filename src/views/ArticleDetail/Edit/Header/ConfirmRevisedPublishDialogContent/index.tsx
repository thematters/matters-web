import { FormattedMessage } from 'react-intl'

import IMAGE_PUBLISH from '@/public/static/images/publish-1.svg?url'
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
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Publish" id="syEQFE" />}
      onClick={onPublish}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="發布須知" zh_hans="發布须知" en="Notice" />}
        leftBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
            onClick={onBack}
          />
        }
        rightBtn={SubmitButton}
      />

      <Dialog.Content>
        <Dialog.Content.Message align="left" smUpAlign="left">
          <section className={styles.imageContainer}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${IMAGE_PUBLISH})` }}
            />
          </section>

          <ul>
            <li>
              <Translate
                zh_hant="編輯後的作品即將永久儲存至星際文件系統（IPFS）分布式節點中。新舊版本永存。"
                zh_hans="编辑后的作品即将永久储存至星际文件系统（IPFS）分布式节点中。新旧版本永存。"
              />
            </li>
            <li>
              <Translate
                zh_hant="編輯發布後，站內將僅顯示編輯後作品，暫不提供草稿或其他方式回顧過往文字，請自行備份留存喔。"
                zh_hans="编辑发布后，站内将仅显示编辑后作品，暂不提供草稿或其他方式回顾过往文字，请自行备份留存喔。"
              />
            </li>
          </ul>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={onBack}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default ConfirmRevisedPublishDialogContent
