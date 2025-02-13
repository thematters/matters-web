import classnames from 'classnames'
import Link from 'next/link'
import { useEffect } from 'react'

import { ReactComponent as IconDown } from '@/public/static/icons/24px/down.svg'
import { Icon, useRoute } from '~/components'
import { ChannelsQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type SingleLineProps = {
  channels: ChannelsQuery['channels']
  toggleDropdown: () => void
}

const SingleLine = ({ channels, toggleDropdown }: SingleLineProps) => {
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  useEffect(() => {
    if (shortHash) {
      // scroll to the selected channel
      const selectedChannel = document.querySelector(
        `.singleLine-item[data-channel-short-hash="${shortHash}"]`
      )
      if (selectedChannel) {
        selectedChannel.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      }
    }
  }, [shortHash])

  return (
    // <div className={styles.container}>
    <section className={styles.singleLine}>
      {channels.map((channel, index) => (
        <Link key={channel.id} scroll={false} href={`/c/${channel.shortHash}`}>
          <a
            className={classnames({
              ['singleLine-item']: true,
              [styles.item]: true,
              [styles.selectedChannel]:
                shortHash === channel.shortHash || (!shortHash && index === 0),
            })}
            data-channel-short-hash={channel.shortHash}
          >
            {channel.name}
          </a>
        </Link>
      ))}
      <button className={styles.moreBtn} onClick={toggleDropdown}>
        <span className={styles.moreBtnContent}>
          <Icon aria-label="More" icon={IconDown} size={16} />
        </span>
      </button>
    </section>
    // </div>
  )
}

export default SingleLine
