import classnames from 'classnames'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { FEATUED_CHANNEL_SHORT_HASH, PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import { LinkWrapper, useRoute, ViewerContext } from '~/components'
import { useChannels } from '~/components/Context'

import ChannelItem from './ChannelItem'
import styles from './styles.module.css'

const SideChannelNav = () => {
  const { isInPath } = useRoute()
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed
  const { channels } = useChannels()

  const [showTopGradient, setShowTopGradient] = useState(false)
  const [showBottomGradient, setShowBottomGradient] = useState(false)
  const contentRef = useRef<HTMLElement>(null)

  const checkScroll = useCallback(() => {
    if (!contentRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current
    setShowTopGradient(scrollTop > 10)
    setShowBottomGradient(scrollTop < scrollHeight - clientHeight - 10)
  }, [contentRef])

  useEffect(() => {
    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener('scroll', checkScroll)
      checkScroll()

      return () => {
        contentElement.removeEventListener('scroll', checkScroll)
      }
    }
  }, [contentRef, checkScroll])

  const onTabClick = (type: string) => {
    analytics.trackEvent('click_button', {
      type: `channel_tab_${type}` as `channel_tab_${string}`,
      pageType: 'home',
    })
  }

  const featuredShortHash =
    process.env.NODE_ENV === 'production'
      ? FEATUED_CHANNEL_SHORT_HASH.production
      : FEATUED_CHANNEL_SHORT_HASH.development

  return (
    <section className={styles.content} ref={contentRef}>
      <section
        className={classnames(styles.sideChannelNav, {
          [styles.showTopGradient]: showTopGradient,
          [styles.showBottomGradient]: showBottomGradient,
        })}
      >
        {isAuthed && (
          <LinkWrapper
            href={PATHS.FOLLOW}
            className={classnames({
              [styles.item]: true,
              [styles.selectedChannel]:
                (isAuthed && isInPath('HOME')) || isInPath('FOLLOW'),
            })}
            onClick={() => onTabClick('follow')}
          >
            <span>
              <FormattedMessage defaultMessage="My Page" id="enMIYK" />
            </span>
          </LinkWrapper>
        )}
        <LinkWrapper
          href={`${PATHS.FEATURED}`}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]:
              isInPath('FEATURED') || (!isAuthed && isInPath('HOME')),
          })}
          onClick={() => onTabClick('featured')}
        >
          <span>
            <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
          </span>
        </LinkWrapper>
        {channels.map((c) =>
          c.shortHash !== featuredShortHash ? (
            <ChannelItem key={c.id} channel={c} />
          ) : null
        )}
        <LinkWrapper
          href={`${PATHS.NEWEST}`}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]: isInPath('NEWEST'),
          })}
          onClick={() => onTabClick('newest')}
        >
          <span>
            <FormattedMessage
              defaultMessage="Latest"
              id="gykfC8"
              description="src/components/Layout/SideChannelNav/index.tsx"
            />
          </span>
        </LinkWrapper>
      </section>
    </section>
  )
}

export default SideChannelNav
