import classnames from 'classnames'
import { useState } from 'react'
import { useEffect } from 'react'

import { ReactComponent as IconUp } from '@/public/static/icons/24px/up.svg'
import { Icon } from '~/components'

import styles from './styles.module.css'

type DropdownDialogProps = {
  items: {
    id: string
    title: string
    link: string
  }[]
  toggleDropdown: () => void
}

const DropdownDialog = ({ items, toggleDropdown }: DropdownDialogProps) => {
  const [hash, setHash] = useState('')

  useEffect(() => {
    // Function to update the hash state
    const updateHash = () => {
      setHash(window.location.hash)
    }

    // Set the initial hash
    updateHash()

    // Add an event listener to update the hash when it changes
    window.addEventListener('hashchange', updateHash)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', updateHash)
    }
  }, [])

  const [selectedChannel, setSelectedChannel] = useState(1)

  useEffect(() => {
    if (hash) {
      const channel = parseInt(hash.split('=')[1], 10)
      setSelectedChannel(channel)
    }
  }, [hash])

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
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  onClick={() => {
                    if (selectedChannel === parseInt(item?.id || '1', 10)) {
                      return
                    }
                    toggleDropdown()
                  }}
                  className={classnames(styles.gridItem, {
                    [styles.selectedChannel]:
                      selectedChannel === parseInt(item?.id || '1', 10),
                  })}
                >
                  {item.title}
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
