import classnames from 'classnames'
import { useContext, useLayoutEffect } from 'react'
import { useRef, useState } from 'react'

import { CHANNEL_PATH_TYPES } from '~/common/enums'
import { analytics } from '~/common/utils'
import { LanguageContext, LinkWrapper, Tooltip } from '~/components'
import { useRoute } from '~/components/Hook/useRoute'
import { RootQueryPrivateQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type ChannelItemProps = {
  channel: RootQueryPrivateQuery['channels'][number]
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { getQuery } = useRoute()
  const { lang } = useContext(LanguageContext)

  const shortHash = getQuery('shortHash')

  const [lineClampable, setLineClampable] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const node: React.RefObject<any> | null = useRef(null)

  useLayoutEffect(() => {
    if (!node || !node.current) {
      return
    }
    let height = node.current.clientHeight || 0
    const computedStyle = window.getComputedStyle(node.current, null)
    height -=
      parseInt(computedStyle.paddingTop, 10) +
      parseInt(computedStyle.paddingBottom, 10)
    const lineHeight = computedStyle.getPropertyValue('line-height')
    const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)
    if (lines > 2) {
      setLineClampable(true)
    }
    setFirstRender(false)
  }, [])

  if (
    !channel ||
    (channel.__typename !== 'TopicChannel' &&
      channel.__typename !== 'CurationChannel' &&
      channel.__typename !== 'WritingChallenge')
  ) {
    return null
  }

  const isWritingChallenge = channel.__typename === 'WritingChallenge'

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
      content={channelName}
      zIndex={1000}
      placement="auto-start"
      delay={[1000, null]}
      touch={['hold', 1000]}
      disabled={!lineClampable}
    >
      <LinkWrapper
        href={`/${pathType}/${channel.shortHash}`}
        ref={node}
        className={classnames({
          [styles.item]: true,
          [styles.selectedChannel]: shortHash === channel.shortHash,
          [styles.temporaryChannel]: isWritingChallenge,
          [styles.lineClampable]: !firstRender && lineClampable,
        })}
        onClick={() => {
          analytics.trackEvent('click_button', {
            type: `channel_tab_${channel.id}` as `channel_tab_${string}`,
            pageType: 'home',
          })
        }}
      >
        <span>{channelName}</span>
      </LinkWrapper>
    </Tooltip>
  )
}

export default ChannelItem
