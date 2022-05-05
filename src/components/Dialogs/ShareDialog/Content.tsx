import { Dialog, ShareButtons, Translate } from '~/components'

import { TextId } from '~/common/enums'

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
}) => (
  <>
    <Dialog.Header
      title={headerTitle || 'share'}
      closeDialog={closeDialog}
      closeTextId="close"
      mode={headerTitle ? 'inner' : 'hidden'}
    />

    <Dialog.Content>
      {description && (
        <section className="description">
          {description}

          <style jsx>{styles}</style>
        </section>
      )}

      <section className="socials-container">
        <section className="left">
          <ShareButtons.LINE title={shareTitle} link={shareLink} />
          <ShareButtons.WhatsApp title={shareTitle} link={shareLink} />
          <ShareButtons.Telegram title={shareTitle} link={shareLink} />
          <ShareButtons.Douban title={shareTitle} link={shareLink} />
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

      <Copy link={shareLink} />
    </Dialog.Content>

    <Dialog.Footer>
      {footerButtons || (
        <Dialog.Footer.Button
          bgColor="grey-lighter"
          textColor="black"
          onClick={closeDialog}
        >
          <Translate id="close" />
        </Dialog.Footer.Button>
      )}
    </Dialog.Footer>
  </>
)

export default ShareDialogContent
