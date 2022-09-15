import classNames from 'classnames'

import { Dialog, ShareButtons, Translate } from '~/components'

import { TextId } from '~/common/enums'
import { toLocale } from '~/common/utils'

import Copy from './Copy'
import styles from './styles.css'

export interface ShareDialogContentProps {
  closeDialog: () => void

  shareTitle: string
  shareLink: string
  shareTags?: string[]

  headerTitle?: TextId | React.ReactNode
  description?: React.ReactNode
  footerButtons?: React.ReactNode
}

const ShareDialogContent: React.FC<ShareDialogContentProps> = ({
  closeDialog,

  shareTitle,
  shareLink,
  shareTags,

  headerTitle,
  description,
  footerButtons,
}) => {
  const url = new URL(shareLink)
  const pathnames = url.pathname.split('/')
  const showTranslation = toLocale(pathnames[1]) !== ''
  if (showTranslation) {
    description = (
      <Translate
        zh_hant="分享這篇文章的翻譯版本"
        zh_hans="分享这篇文章的翻译版本"
        en="Share this article in translated version"
      />
    )
  }
  const containerClasses = classNames({
    'socials-container': true,
    'spacing-bottom': !footerButtons,
  })
  return (
    <>
      {headerTitle ? (
        <Dialog.Header
          title={headerTitle}
          closeDialog={closeDialog}
          closeTextId="close"
          mode="inner"
        />
      ) : (
        <Dialog.Header
          title={'share'}
          closeDialog={closeDialog}
          leftButton={
            <Dialog.Header.CloseButton
              closeDialog={closeDialog}
              textId="close"
            />
          }
        />
      )}

      <Dialog.Content>
        {description && (
          <section className="description">
            {description}

            <style jsx>{styles}</style>
          </section>
        )}

        <section className={containerClasses}>
          <section className="left">
            <ShareButtons.LINE title={shareTitle} link={shareLink} />
            <ShareButtons.WhatsApp title={shareTitle} link={shareLink} />
            <ShareButtons.Telegram title={shareTitle} link={shareLink} />
            <ShareButtons.Douban title={shareTitle} link={shareLink} />
            <Copy link={shareLink} />
          </section>

          <section className="right">
            <ShareButtons.Twitter
              title={shareTitle}
              link={shareLink}
              tags={shareTags}
            />
            <ShareButtons.Facebook title={shareTitle} link={shareLink} />
            <ShareButtons.Weibo title={shareTitle} link={shareLink} />
            <ShareButtons.Email title={shareTitle} link={shareLink} />
          </section>

          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>

      {footerButtons && <Dialog.Footer>{footerButtons}</Dialog.Footer>}
    </>
  )
}

export default ShareDialogContent
