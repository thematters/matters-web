import classnames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS, TEMPORARY_CHANNEL_URL } from '~/common/enums'
import {
  LanguageContext,
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
  const { getQuery, router, isInPath, isPathStartWith } = useRoute()
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed
  const isInTemporaryChannel = isPathStartWith(TEMPORARY_CHANNEL_URL, true)

  const [showTopGradient, setShowTopGradient] = useState(false)
  const [showBottomGradient, setShowBottomGradient] = useState(false)
  const contentRef = useRef<HTMLElement>(null)
  const sideChannelNavRef = useRef<HTMLElement>(null)
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
    setTimeout(() => {
      const contentElement = contentRef.current
      if (contentElement) {
        checkScroll()
      }
    }, 1000)
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const element = e.currentTarget
    const { scrollTop, scrollHeight, clientHeight } = element

    setShowTopGradient(scrollTop > 10)
    setShowBottomGradient(scrollTop < scrollHeight - clientHeight - 10)
  }

  if (loading) return <Placeholder />

  const channels = data?.channels || []

  const sortedChannels = [...channels]
    .filter((c) => c.enabled)
    .sort((a, b) => {
      const prefixA = parseInt(a.name.split('_')[0], 10) || 0
      const prefixB = parseInt(b.name.split('_')[0], 10) || 0

      return prefixA - prefixB
    })

  const navigateTo = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(path)
  }

  return (
    <section
      className={styles.content}
      ref={contentRef}
      onScroll={handleScroll}
    >
      <section
        className={classnames(styles.sideChannelNav, {
          [styles.showTopGradient]: showTopGradient,
          [styles.showBottomGradient]: showBottomGradient,
        })}
        ref={sideChannelNavRef}
      >
        {isAuthed && (
          <a
            href={PATHS.FOLLOW}
            className={classnames({
              [styles.item]: true,
              [styles.selectedChannel]:
                (isAuthed && isInPath('HOME') && !getQuery('type')) ||
                isInPath('FOLLOW'),
            })}
            onClick={(e) => navigateTo(e, PATHS.FOLLOW)}
          >
            <FormattedMessage defaultMessage="My Page" id="enMIYK" />
          </a>
        )}
        <a
          href={`${PATHS.HOME}?type=icymi`}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]:
              getQuery('type') === 'icymi' ||
              (!isAuthed && isInPath('HOME') && !getQuery('type')),
          })}
          onClick={(e) => navigateTo(e, `${PATHS.HOME}?type=icymi`)}
        >
          <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
        </a>
        <a
          href={TEMPORARY_CHANNEL_URL}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]: isInTemporaryChannel,
            [styles.temporaryChannel]: true,
            [styles.selectedTemporaryChannel]: isInTemporaryChannel,
          })}
          onClick={(e) => navigateTo(e, TEMPORARY_CHANNEL_URL)}
        >
          <span>
            <FormattedMessage
              defaultMessage="FreeWrite"
              id="eVq7Ji"
              description="src/components/Layout/SideChannelNav/index.tsx"
            />
          </span>
        </a>
        {sortedChannels.map((c) => (
          <ChannelItem key={c.id} channel={c} />
        ))}
        <a
          href={`${PATHS.HOME}?type=newest`}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]:
              isInPath('HOME') && getQuery('type') === 'newest',
          })}
          onClick={(e) => navigateTo(e, `${PATHS.HOME}?type=newest`)}
        >
          <FormattedMessage
            defaultMessage="Latest"
            id="gykfC8"
            description="src/components/Layout/SideChannelNav/index.tsx"
          />
        </a>
      </section>
    </section>
  )
}

export default SideChannelNav
