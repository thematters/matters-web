import classnames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS, TEMPORARY_CHANNEL_URL } from '~/common/enums'
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

  const checkScroll = () => {
    if (!contentRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current
    setShowTopGradient(scrollTop > 10)
    setShowBottomGradient(scrollTop < scrollHeight - clientHeight - 10)
  }

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
  }, [loading, contentRef])

  if (loading) return <Placeholder />

  const channels = data?.channels || []

  const sortedChannels = [...channels]
    .filter((c) => c.enabled)
    .sort((a, b) => {
      const prefixA = parseInt(a.name.split('_')[0], 10) || 0
      const prefixB = parseInt(b.name.split('_')[0], 10) || 0

      return prefixA - prefixB
    })

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
          >
            <FormattedMessage defaultMessage="My Page" id="enMIYK" />
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
        >
          <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
        </LinkWrapper>
        <LinkWrapper
          href={TEMPORARY_CHANNEL_URL}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]: isInTemporaryChannel,
            [styles.temporaryChannel]: true,
            [styles.selectedTemporaryChannel]: isInTemporaryChannel,
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
        >
          <FormattedMessage
            defaultMessage="Latest"
            id="gykfC8"
            description="src/components/Layout/SideChannelNav/index.tsx"
          />
        </LinkWrapper>
      </section>
    </section>
  )
}

export default SideChannelNav
