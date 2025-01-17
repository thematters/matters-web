import classnames from 'classnames'
import { useState } from 'react'
import { useEffect } from 'react'

import { ReactComponent as IconDown } from '@/public/static/icons/24px/down.svg'
import { Icon } from '~/components'

import styles from './styles.module.css'

type SingleLineProps = {
  items: {
    id: string
    title: string
    link: string
  }[]
  toggleDropdown: () => void
}

const SingleLine = ({ items, toggleDropdown }: SingleLineProps) => {
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

      // scroll to the selected channel
      const selectedChannel = document.querySelector(
        `.singleLine-item[data-channel-id="${channel}"]`
      )
      if (selectedChannel) {
        selectedChannel.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      }
    }
  }, [hash])

  return (
    // <div className={styles.container}>
    <section className={styles.singleLine}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className={classnames({
            ['singleLine-item']: true,
            [styles.item]: true,
            [styles.selectedChannel]:
              selectedChannel === parseInt(item?.id || '1', 10),
          })}
          data-channel-id={item.id}
        >
          {item.title}
        </a>
      ))}
      <button className={styles.moreBtn} onClick={toggleDropdown}>
        <Icon aria-label="More" icon={IconDown} size={16} />
      </button>
    </section>
    // </div>
  )
}

export default SingleLine
