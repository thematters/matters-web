import classnames from 'classnames'
import { useLayoutEffect } from 'react'
import { useRef, useState } from 'react'

import { Tooltip } from '~/components'
import { useRoute } from '~/components/Hook/useRoute'
import { ChannelsQuery } from '~/gql/graphql'

import styles from './styles.module.css'
type ChannelItemProps = {
  channel: ChannelsQuery['channels'][number]
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { getQuery, router } = useRoute()
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

  return (
    <Tooltip
      content={channel.name}
      zIndex={1000}
      placement="auto-start"
      delay={[1000, null]}
      touch={['hold', 1000]}
      disabled={!lineClampable}
    >
      <a
        ref={node}
        key={channel.id}
        href={`/c/${channel.shortHash}`}
        className={classnames({
          [styles.item]: true,
          [styles.selectedChannel]: shortHash === channel.shortHash,
          [styles.lineClampable]: !firstRender,
        })}
        data-channel-id={channel.id}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          router.push(`/c/${channel.shortHash}`)
        }}
      >
        <span>{channel.name}</span>
      </a>
    </Tooltip>
  )
}

export default ChannelItem
