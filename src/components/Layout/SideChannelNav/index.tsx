import classnames from 'classnames'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS, TEMPORARY_CHANNEL_URL } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  LanguageContext,
  LinkWrapper,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { CHANNELS } from '~/components/GQL/queries/channels'
import { ChannelsQuery } from '~/gql/graphql'

import ChannelItem from './ChannelItem'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

const SideChannelNav = () => {
  const { getQuery, isInPath, isPathStartWith } = useRoute()
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed
  const isInTemporaryChannel = isPathStartWith(TEMPORARY_CHANNEL_URL, true)

  const [showTopGradient, setShowTopGradient] = useState(false)
  const [showBottomGradient, setShowBottomGradient] = useState(false)
  const contentRef = useRef<HTMLElement>(null)
  const { lang } = useContext(LanguageContext)

  const { data, loading } = usePublicQuery<ChannelsQuery>(CHANNELS, {
    variables: { userLanguage: lang },
  })

  const checkScroll = useCallback(() => {
    if (!contentRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current
    setShowTopGradient(scrollTop > 10)
    setShowBottomGradient(scrollTop < scrollHeight - clientHeight - 10)
  }, [contentRef])

  useEffect(() => {
    const contentElement = contentRef.current
    if (loading) return
    if (contentElement) {
      contentElement.addEventListener('scroll', checkScroll)
      checkScroll()

      return () => {
        contentElement.removeEventListener('scroll', checkScroll)
      }
    }
  }, [loading, contentRef, checkScroll])

  if (loading) return <Placeholder />

  const channels = data?.channels || []

  const sortedChannels = [...channels]
    .filter(
      (
        c
      ): c is Extract<
        typeof c,
        { __typename?: 'TopicChannel'; enabled: boolean; name: string }
      > =>
        c.__typename === 'TopicChannel' &&
        'enabled' in c &&
        'name' in c &&
        c.enabled
    )
    .sort((a, b) => {
      const prefixA = parseInt(a.name.split('_')[0], 10) || 0
      const prefixB = parseInt(b.name.split('_')[0], 10) || 0

      return prefixA - prefixB
    })

  const onTabClick = (type: string) => {
    analytics.trackEvent('click_button', {
      type: `channel_tab_${type}` as `channel_tab_${string}`,
      pageType: 'home',
    })
  }

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
                (isAuthed && isInPath('HOME') && !getQuery('type')) ||
                isInPath('FOLLOW'),
            })}
            onClick={() => onTabClick('follow')}
          >
            <span>
              <FormattedMessage defaultMessage="My Page" id="enMIYK" />
            </span>
          </LinkWrapper>
        )}
        <LinkWrapper
          href={`${PATHS.HOME}?type=icymi`}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]:
              getQuery('type') === 'icymi' ||
              (!isAuthed && isInPath('HOME') && !getQuery('type')),
          })}
          onClick={() => onTabClick('featured')}
        >
          <span>
            <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
          </span>
        </LinkWrapper>
        <LinkWrapper
          href={TEMPORARY_CHANNEL_URL}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]: isInTemporaryChannel,
            [styles.temporaryChannel]: true,
          })}
        >
          <span>
            <FormattedMessage
              defaultMessage="FreeWrite"
              id="eVq7Ji"
              description="src/components/Layout/SideChannelNav/index.tsx"
            />
          </span>
        </LinkWrapper>
        {sortedChannels.map((c) => (
          <ChannelItem key={c.id} channel={c} />
        ))}
        <LinkWrapper
          href={`${PATHS.HOME}?type=newest`}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]:
              isInPath('HOME') && getQuery('type') === 'newest',
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
