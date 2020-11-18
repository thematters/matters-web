import classNames from 'classnames'

import { TextIcon } from '~/components/TextIcon'

import { ShareButtons } from '../Buttons'
import styles from './styles.css'

export interface EmbedShareProps {
  title?: string
  path?: string
  description?: React.ReactNode

  headerTitle: React.ReactElement
  wrap?: boolean
}

/**
 * Share component, used by onboarding tasks currently.
 * Unlike <ShareDialog>, it's flat and unfoled by default with circle icons.
 *
 */
export const EmbedShare = ({
  title,
  path,
  headerTitle,
  wrap,
}: EmbedShareProps) => {
  const shareLink = process.browser
    ? path
      ? `${window.location.origin}${path}`
      : window.location.href
    : ''
  const shareTitle =
    title || (process.browser ? window.document.title || '' : '')

  const buttonClasses = classNames({
    buttons: true,
    wrap,
  })

  return (
    <section className="share">
      <header>
        <h4>
          <TextIcon size="sm" weight="normal">
            {headerTitle}
          </TextIcon>
        </h4>
      </header>

      <section className={buttonClasses}>
        <span className="left">
          <ShareButtons.LINE title={shareTitle} link={shareLink} circle />
          <ShareButtons.WhatsApp title={shareTitle} link={shareLink} circle />
          <ShareButtons.Telegram title={shareTitle} link={shareLink} circle />
          <ShareButtons.Douban title={shareTitle} link={shareLink} circle />
        </span>

        <span className="right">
          <ShareButtons.Twitter title={shareTitle} link={shareLink} circle />
          <ShareButtons.Facebook title={shareTitle} link={shareLink} circle />
          <ShareButtons.Weibo title={shareTitle} link={shareLink} circle />
          <ShareButtons.Email title={shareTitle} link={shareLink} circle />
        </span>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
