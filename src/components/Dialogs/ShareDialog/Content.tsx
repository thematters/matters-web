import classNames from 'classnames'

import { TextId } from '~/common/enums'
import { Dialog, ShareButtons, Translate } from '~/components'

import Copy from './Copy'
import styles from './styles.module.css'

export interface ShareDialogContentProps {
  closeDialog: () => void

  shareTitle: string
  shareLink: string
  shareTags?: string[]

  headerTitle?: TextId | React.ReactNode
  description?: React.ReactNode
  btns?: React.ReactNode
  mdUpBtns?: React.ReactNode
}

const ShareDialogContent: React.FC<ShareDialogContentProps> = ({
  closeDialog,

  shareTitle,
  shareLink,
  shareTags,

  headerTitle,
  description,
  btns,
  mdUpBtns,
}) => {
  const url = new URL(shareLink)
  if (url.searchParams.get('locale')) {
    description = (
      <Translate
        zh_hant="分享這篇文章的翻譯版本"
        zh_hans="分享这篇文章的翻译版本"
        en="Share this article in translated version"
      />
    )
  }
  const containerClasses = classNames({
    [styles.socialsContainer]: true,
  })
  return (
    <>
      {headerTitle ? (
        <Dialog.Header title={headerTitle} />
      ) : (
        <Dialog.Header
          title="share"
          leftBtn={
            <Dialog.TextButton
              color="green"
              onClick={closeDialog}
              text="close"
            />
          }
        />
      )}

      <Dialog.Content>
        {description && (
          <section className={styles.description}>{description}</section>
        )}

        <section className={containerClasses}>
          <section className={styles.left}>
            <ShareButtons.LINE title={shareTitle} link={shareLink} />
            <ShareButtons.WhatsApp title={shareTitle} link={shareLink} />
            <ShareButtons.Telegram title={shareTitle} link={shareLink} />
            <ShareButtons.Douban title={shareTitle} link={shareLink} />
            <Copy link={shareLink} />
          </section>

          <section className={styles.right}>
            <ShareButtons.Twitter
              title={shareTitle}
              link={shareLink}
              tags={shareTags}
            />
            <ShareButtons.Facebook title={shareTitle} link={shareLink} />
            <ShareButtons.Weibo title={shareTitle} link={shareLink} />
            <ShareButtons.Email title={shareTitle} link={shareLink} />
          </section>
        </section>
      </Dialog.Content>

      {btns || mdUpBtns ? (
        <Dialog.Footer btns={btns} mdUpBtns={mdUpBtns} />
      ) : (
        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={<Translate id="close" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
          mdUpBtns={
            <Dialog.TextButton
              text={<Translate id="close" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}

export default ShareDialogContent
