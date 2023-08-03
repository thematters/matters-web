import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

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
  smUpBtns?: React.ReactNode
}

const ShareDialogContent: React.FC<ShareDialogContentProps> = ({
  closeDialog,

  shareTitle,
  shareLink,
  shareTags,

  headerTitle,
  description,
  btns,
  smUpBtns,
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
        <Dialog.Header title="share" />
      )}

      <Dialog.Content noSpacing smExtraSpacing={false}>
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

      {btns || smUpBtns ? (
        <Dialog.Footer btns={btns} smUpBtns={smUpBtns} />
      ) : (
        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Close" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" />}
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
