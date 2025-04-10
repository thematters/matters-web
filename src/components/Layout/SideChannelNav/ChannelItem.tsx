import classnames from 'classnames'
import { useLayoutEffect } from 'react'
import { useRef, useState } from 'react'

import { displayChannelName } from '~/common/utils'
import { LinkWrapper, Tooltip } from '~/components'
import { useRoute } from '~/components/Hook/useRoute'
import { ChannelsQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type ChannelItemProps = {
  channel: ChannelsQuery['channels'][number]
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { getQuery } = useRoute()
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

  if (!channel || channel.__typename !== 'TopicChannel') {
    return null
  }

  const channelName = channel.name

  return (
    <Tooltip
      content={displayChannelName(channelName)}
      zIndex={1000}
      placement="auto-start"
      delay={[1000, null]}
      touch={['hold', 1000]}
      disabled={!lineClampable}
    >
      <LinkWrapper
        href={`/c/${channel.shortHash}`}
        ref={node}
        className={classnames({
          [styles.item]: true,
          [styles.selectedChannel]: shortHash === channel.shortHash,
          [styles.lineClampable]: !firstRender && lineClampable,
        })}
      >
        <span>{displayChannelName(channelName)}</span>
      </LinkWrapper>
    </Tooltip>
  )
}

export default ChannelItem
