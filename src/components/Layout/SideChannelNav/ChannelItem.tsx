import classnames from 'classnames'
import Link from 'next/link'
import { useContext } from 'react'
import { useRef } from 'react'

import { BREAKPOINTS, CHANNEL_PATH_TYPES } from '~/common/enums'
import { analytics } from '~/common/utils'
import { LanguageContext, Tooltip, useMediaQuery } from '~/components'
import { useRoute } from '~/components/Hook/useRoute'
import { RootQueryPrivateQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type ChannelItemProps = {
  channel: RootQueryPrivateQuery['channels'][number]
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const { lang } = useContext(LanguageContext)
  const node: React.RefObject<HTMLAnchorElement> | null = useRef(null)

  if (
    !channel ||
    (channel.__typename !== 'TopicChannel' &&
      channel.__typename !== 'CurationChannel' &&
      channel.__typename !== 'WritingChallenge')
  ) {
    return null
  }

  const isWritingChallenge = channel.__typename === 'WritingChallenge'
  const isCurationChannel = channel.__typename === 'CurationChannel'

  const pathType = isWritingChallenge
    ? CHANNEL_PATH_TYPES.WRITING_CHALLENGE
    : CHANNEL_PATH_TYPES.REGULAR_CHANNEL

  const channelName =
    lang === 'zh_hans'
      ? channel.nameZhHans
      : lang === 'zh_hant'
        ? channel.nameZhHant
        : channel.nameEn

  return (
    <Tooltip
      disabled={!isMdUp}
      content={channelName}
      zIndex={1000}
      placement="right"
      delay={[1000, null]}
      touch={['hold', 1000]}
    >
      <Link
        href={`/${pathType}/${channel.shortHash}`}
        ref={node}
        className={classnames({
          [styles.item]: true,
          [styles.selected]: shortHash === channel.shortHash,
          [styles.temporary]: isWritingChallenge || isCurationChannel,
        })}
        aria-selected={shortHash === channel.shortHash}
        onClick={() => {
          analytics.trackEvent('click_button', {
            type: `channel_tab_${channel.id}` as `channel_tab_${string}`,
            pageType: 'home',
          })
        }}
      >
        <span className={styles.name}>
          <span className={styles.inner}>{channelName}</span>
        </span>
      </Link>
    </Tooltip>
  )
}

export default ChannelItem
