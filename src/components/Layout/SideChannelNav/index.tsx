import classnames from 'classnames'
import { useEffect, useState } from 'react'
import Sticky from 'react-stickynode'

import styles from './styles.module.css'

const SideChannelNav = () => {
  const host = typeof window !== 'undefined' ? window.location.origin : ''
  const items = [
    {
      id: '1',
      title: '精選',
      link: `${host}/#channel=1`,
    },
    {
      id: '2',
      title: '時事話題',
      link: `${host}/#channel=2`,
    },
    {
      id: '3',
      title: '思想歷史',
      link: `${host}/#channel=3`,
    },
    {
      id: '4',
      title: '文化藝術',
      link: `${host}/#channel=4`,
    },
    {
      id: '5',
      title: '科技',
      link: `${host}/#channel=5`,
    },
    {
      id: '6',
      title: '經濟財經',
      link: `${host}/#channel=6`,
    },
    {
      id: '7',
      title: '政治',
      link: `${host}/#channel=7`,
    },
    {
      id: '8',
      title: '社會',
      link: `${host}/#channel=8`,
    },
    {
      id: '9',
      title: '國際',
      link: `${host}/#channel=9`,
    },
    {
      id: '10',
      title: '宗教',
      link: `${host}/#channel=10`,
    },
    {
      id: '11',
      title: '教育',
      link: `${host}/#channel=11`,
    },
    {
      id: '12',
      title: '法律',
      link: `${host}/#channel=12`,
    },
    {
      id: '13',
      title: '健康',
      link: `${host}/#channel=13`,
    },
    {
      id: '14',
      title: '運動',
      link: `${host}/#channel=14`,
    },
    {
      id: '15',
      title: '旅遊',
      link: `${host}/#channel=15`,
    },
    {
      id: '16',
      title: '娛樂',
      link: `${host}/#channel=16`,
    },
    {
      id: '17',
      title: '美食',
      link: `${host}/#channel=17`,
    },
    {
      id: '18',
      title: '旅居探索群',
      link: `${host}/#channel=18`,
    },
    {
      id: '19',
      title: '旅居探索分享',
      link: `${host}/#channel=19`,
    },
    {
      id: '20',
      title: '旅居探索',
      link: `${host}/#channel=20`,
    },
    {
      id: '21',
      title: 'Channel 21',
      link: `${host}/#channel=21`,
    },
    {
      id: '22',
      title: 'Channel 22',
      link: `${host}/#channel=22`,
    },
    {
      id: '23',
      title: 'Channel 23',
      link: `${host}/#channel=23`,
    },
    {
      id: '24',
      title: 'Channel 24',
      link: `${host}/#channel=24`,
    },
    {
      id: '25',
      title: 'Channel 25',
      link: `${host}/#channel=25`,
    },
    {
      id: '26',
      title: 'Channel 26',
      link: `${host}/#channel=26`,
    },
    {
      id: '27',
      title: 'Channel 27',
      link: `${host}/#channel=27`,
    },
    {
      id: '28',
      title: 'Channel 28',
      link: `${host}/#channel=28`,
    },
  ]

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

  return (
    <Sticky enabled={true} top={73} enableTransforms={false}>
      <section className={styles.content}>
        <section className={styles.sideChannelNav}>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className={classnames({
                [styles.item]: true,
                [styles.selectedChannel]:
                  selectedChannel === parseInt(item?.id || '1', 10),
              })}
              data-channel-id={item.id}
            >
              {item.title}
            </a>
          ))}
        </section>
      </section>
    </Sticky>
  )
}

export default SideChannelNav
