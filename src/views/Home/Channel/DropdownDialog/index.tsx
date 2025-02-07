import classnames from 'classnames'

import { ReactComponent as IconUp } from '@/public/static/icons/24px/up.svg'
import { Icon, useRoute } from '~/components'
import { ChannelsQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type DropdownDialogProps = {
  channels: ChannelsQuery['channels']
  toggleDropdown: () => void
}

const DropdownDialog = ({ channels, toggleDropdown }: DropdownDialogProps) => {
  const { getQuery, router } = useRoute()
  const shortHash = getQuery('shortHash')

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // click in container but not in content
    const target = event.target as HTMLElement
    if (target.closest('#channel-dropdown-dialog-content') === null) {
      toggleDropdown()
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.content} id="channel-dropdown-dialog-content">
        <div className={styles.contentInner}>
          <div className={styles.header}>
            <div className={styles.title}>選擇頻道</div>
            <button className={styles.closeBtn} onClick={toggleDropdown}>
              <Icon
                aria-label="Close"
                icon={IconUp}
                size={16}
                color="greyDarker"
              />
            </button>
          </div>
          <div className={styles.body}>
            <div className={styles.grid}>
              {channels.map((channel, index) => (
                <a
                  key={channel.id}
                  href={`/c/${channel.shortHash}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (shortHash === channel.shortHash) {
                      return
                    }
                    toggleDropdown()
                    router.push(`/c/${channel.shortHash}`)
                  }}
                  className={classnames(styles.gridItem, {
                    [styles.selectedChannel]:
                      shortHash === channel.shortHash ||
                      (!shortHash && index === 0),
                  })}
                  data-channel-short-hash={channel.shortHash}
                >
                  {channel.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownDialog
