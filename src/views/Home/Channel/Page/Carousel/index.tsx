import classnames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import { type MouseEvent, useEffect, useRef, useState } from 'react'

import Dot from './Dot'
import styles from './styles.module.css'

const ChannelCarousel = () => {
  const host = typeof window !== 'undefined' ? window.location.origin : ''
  const items = [
    {
      id: '1',
      title: 'Item 1',
      link: `${host}/#channel=1`,
    },
    {
      id: '2',
      title: 'Item 2',
      link: `${host}/#channel=2`,
    },
    {
      id: '3',
      title: 'Item 3',
      link: `${host}/#channel=3`,
    },
    {
      id: '4',
      title: 'Item 4',
      link: `${host}/#channel=4`,
    },
    {
      id: '5',
      title: 'Item 5',
      link: `${host}/#channel=5`,
    },
    {
      id: '6',
      title: 'Item 6',
      link: `${host}/#channel=6`,
    },
    {
      id: '7',
      title: 'Item 7',
      link: `${host}/#channel=7`,
    },
  ]
  const [dot, setDot] = useState(0)
  const [, setSnaps] = useState<any[]>([])
  const [carousel, carouselApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  })

  // state of carusel
  const scrolling = useRef(false)
  const settled = useRef(true)

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

  const [selectedChannel, setSelectedChannel] = useState(0)

  useEffect(() => {
    if (hash) {
      const channel = parseInt(hash.split('=')[1], 10)
      setSelectedChannel(channel)
    }
  }, [hash])

  const scroll = (index: number) => {
    if (!carouselApi) {
      return
    }
    setDot(index)
    carouselApi.scrollTo(index)
  }

  const onSelect = () => {
    if (carouselApi) {
      setDot(carouselApi.selectedScrollSnap())
    }
  }

  const onCaptureClick = (event: MouseEvent) => {
    if (scrolling.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    carouselApi.reInit()
    carouselApi.scrollTo(0)

    setDot(0)
    setSnaps(carouselApi.scrollSnapList())

    carouselApi.on('select', onSelect)
    carouselApi.on('scroll', () => {
      if (!scrolling.current && settled.current) {
        scrolling.current = true
        settled.current = false
      }
    })
    carouselApi.on('settle', () => {
      scrolling.current = false
      settled.current = true
    })
  }, [items, carouselApi])

  return (
    <section className={styles.carousel}>
      <section
        className={styles.viewport}
        ref={carousel}
        onClickCapture={onCaptureClick}
      >
        <div className={styles.container}>
          {items?.map((item, i) => {
            const title = item.title || ''

            return (
              <div key={item.id} className={styles.slide}>
                <div className={styles.content}>
                  <a
                    href={item.link + 1}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 1, 10),
                    })}
                  >
                    {title}1
                  </a>

                  <a
                    href={item.link + 2}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 2, 10),
                    })}
                  >
                    {title}2
                  </a>

                  <a
                    href={item.link + 3}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 3, 10),
                    })}
                  >
                    {title}3
                  </a>

                  <a
                    href={item.link + 4}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 4, 10),
                    })}
                  >
                    {title}4
                  </a>

                  <a
                    href={item.link + 5}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 5, 10),
                    })}
                  >
                    {title}5
                  </a>

                  <a
                    href={item.link + 6}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 6, 10),
                    })}
                  >
                    {title}6
                  </a>

                  <a
                    href={item.link + 7}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 7, 10),
                    })}
                  >
                    {title}7
                  </a>

                  <a
                    href={item.link + 8}
                    className={classnames({
                      [styles.selectedChannel]:
                        selectedChannel === parseInt(item.id + 8, 10),
                    })}
                  >
                    {title}8
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <footer className={styles.footer}>
        <section className={styles.dots}>
          {items?.map((_, index) => (
            <Dot
              key={index}
              index={index}
              selected={index === dot}
              scroll={scroll}
            />
          ))}
        </section>
      </footer>
    </section>
  )
}

export default ChannelCarousel
