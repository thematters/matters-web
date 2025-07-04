import classnames from 'classnames'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { FEATUED_CHANNEL_SHORT_HASH, PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import { useRoute, ViewerContext } from '~/components'
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

  const filteredChannels = channels.filter(
    (c) => c.shortHash !== FEATUED_CHANNEL_SHORT_HASH
  )

  return (
    <section className={styles.content} ref={contentRef}>
      <section
        className={classnames({
          [styles.sideChannelNav]: true,
          [styles.showTopGradient]: showTopGradient,
          [styles.showBottomGradient]: showBottomGradient,
        })}
      >
        {isAuthed && (
          <Link
            href={PATHS.FOLLOW}
            className={classnames({
              [styles.item]: true,
              [styles.selected]:
                (isAuthed && isInPath('HOME')) || isInPath('FOLLOW'),
            })}
            aria-selected={(isAuthed && isInPath('HOME')) || isInPath('FOLLOW')}
            onClick={() => onTabClick('follow')}
          >
            <span className={styles.name}>
              <span className={styles.inner}>
                <FormattedMessage defaultMessage="Following" id="cPIKU2" />
              </span>
            </span>
          </Link>
        )}

        <Link
          href={PATHS.FEATURED}
          className={classnames({
            [styles.item]: true,
            [styles.selected]:
              isInPath('FEATURED') || (!isAuthed && isInPath('HOME')),
          })}
          aria-selected={
            isInPath('FEATURED') || (!isAuthed && isInPath('HOME'))
          }
          onClick={() => onTabClick('featured')}
        >
          <span className={styles.name}>
            <span className={styles.inner}>
              <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
            </span>
          </span>
        </Link>

        <Link
          href={PATHS.HOTTES}
          className={classnames({
            [styles.item]: true,
            [styles.selected]: isInPath('HOTTES'),
          })}
          aria-selected={isInPath('HOTTES')}
          onClick={() => onTabClick('hottest')}
        >
          <span className={styles.name}>
            <span className={styles.inner}>
              <FormattedMessage
                defaultMessage="Trending"
                id="8tczzy"
                description="src/components/Layout/SideChannelNav/index.tsx"
              />
            </span>
          </span>
        </Link>

        {filteredChannels.map((c) => (
          <ChannelItem key={c.id} channel={c} />
        ))}

        <Link
          href={PATHS.NEWEST}
          className={classnames({
            [styles.item]: true,
            [styles.selected]: isInPath('NEWEST'),
          })}
          aria-selected={isInPath('NEWEST')}
          onClick={() => onTabClick('newest')}
        >
          <span className={styles.name}>
            <span className={styles.inner}>
              <FormattedMessage
                defaultMessage="Latest"
                id="gykfC8"
                description="src/components/Layout/SideChannelNav/index.tsx"
              />
            </span>
          </span>
        </Link>
      </section>
    </section>
  )
}

export default SideChannelNav
