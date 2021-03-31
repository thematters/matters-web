import { Dialog, ShareButtons, Translate } from '~/components'

import { TextId } from '~/common/enums'

import Copy from './Copy'
import styles from './styles.css'

export interface ShareDialogContentProps {
  shareTitle: string
  shareLink: string

  headerTitle?: TextId | React.ReactElement
  description?: React.ReactNode
  footerButtons?: React.ReactNode
}

const ShareDialogContent: React.FC<ShareDialogContentProps> = ({
  shareTitle,
  shareLink,

  headerTitle,
  description,
  footerButtons,
}) => (
  <>
    <Dialog.Header
      title={headerTitle || 'share'}
      close={close}
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
          <ShareButtons.Twitter title={shareTitle} link={shareLink} />
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
          onClick={close}
        >
          <Translate id="close" />
        </Dialog.Footer.Button>
      )}
    </Dialog.Footer>
  </>
)

export default ShareDialogContent
