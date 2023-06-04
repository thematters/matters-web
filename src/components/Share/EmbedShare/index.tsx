import { TextIcon } from '~/components/TextIcon'

import { ShareButtons } from '../Buttons'
import styles from './styles.module.css'

export interface EmbedShareProps {
  title?: string
  path?: string
  description?: React.ReactNode

  headerTitle: React.ReactNode
}

/**
 * Share component, used by onboarding tasks currently.
 * Unlike <ShareDialog>, it's flat and unfoled by default with circle icons.
 *
 */
export const EmbedShare = ({ title, path, headerTitle }: EmbedShareProps) => {
  const shareLink =
    typeof window !== 'undefined'
      ? path
        ? `${window.location.origin}${path}`
        : window.location.href
      : ''
  const shareTitle =
    title || (typeof window !== 'undefined' ? window.document.title || '' : '')

  return (
    <section className={styles.share}>
      <header>
        <h4>
          <TextIcon size="sm" weight="normal">
            {headerTitle}
          </TextIcon>
        </h4>
      </header>

      <section className={styles.buttons}>
        <span className={styles.left}>
          <ShareButtons.LINE title={shareTitle} link={shareLink} circle />
          <ShareButtons.WhatsApp title={shareTitle} link={shareLink} circle />
          <ShareButtons.Telegram title={shareTitle} link={shareLink} circle />
          <ShareButtons.Douban title={shareTitle} link={shareLink} circle />
        </span>

        <span className={styles.right}>
          <ShareButtons.Twitter title={shareTitle} link={shareLink} circle />
          <ShareButtons.Facebook title={shareTitle} link={shareLink} circle />
          <ShareButtons.Weibo title={shareTitle} link={shareLink} circle />
          <ShareButtons.Email title={shareTitle} link={shareLink} circle />
        </span>
      </section>
    </section>
  )
}
