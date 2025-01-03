import classnames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import {
  type MouseEvent,
  // useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useNativeEventListener } from '~/components'

// import { useCarousel } from '~/components/Hook/useCarousel'
import Dot from './Dot'
import styles from './styles.module.css'

type ColumnCount = '4' | '5' | '6' | '7'

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
    {
      id: '8',
      title: 'Item 8',
      link: `${host}/#channel=8`,
    },
    {
      id: '9',
      title: 'Item 9',
      link: `${host}/#channel=9`,
    },
    {
      id: '10',
      title: 'Item 10',
      link: `${host}/#channel=10`,
    },
    {
      id: '11',
      title: 'Item 11',
      link: `${host}/#channel=11`,
    },
    {
      id: '12',
      title: 'Item 12',
      link: `${host}/#channel=12`,
    },
    {
      id: '13',
      title: 'Item 13',
      link: `${host}/#channel=13`,
    },
    {
      id: '14',
      title: 'Item 14',
      link: `${host}/#channel=14`,
    },
    {
      id: '15',
      title: 'Item 15',
      link: `${host}/#channel=15`,
    },
    {
      id: '16',
      title: 'Item 16',
      link: `${host}/#channel=16`,
    },
    {
      id: '17',
      title: 'Item 17',
      link: `${host}/#channel=17`,
    },
    {
      id: '18',
      title: 'Item 18',
      link: `${host}/#channel=18`,
    },
    {
      id: '19',
      title: 'Item 19',
      link: `${host}/#channel=19`,
    },
    {
      id: '20',
      title: 'Item 20',
      link: `${host}/#channel=20`,
    },
    {
      id: '21',
      title: 'Item 21',
      link: `${host}/#channel=21`,
    },
    {
      id: '22',
      title: 'Item 22',
      link: `${host}/#channel=22`,
    },
    {
      id: '23',
      title: 'Item 23',
      link: `${host}/#channel=23`,
    },
    {
      id: '24',
      title: 'Item 24',
      link: `${host}/#channel=24`,
    },
    {
      id: '25',
      title: 'Item 25',
      link: `${host}/#channel=25`,
    },
    {
      id: '26',
      title: 'Item 26',
      link: `${host}/#channel=26`,
    },
    {
      id: '27',
      title: 'Item 27',
      link: `${host}/#channel=27`,
    },
    {
      id: '28',
      title: 'Item 28',
      link: `${host}/#channel=28`,
    },
  ]
  const [dot, setDot] = useState(0)
  const [, setSnaps] = useState<any[]>([])
  const [carousel, carouselApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  })

  const [columnCount, setColumnCount] = useState<ColumnCount>('4')

  useNativeEventListener('resize', () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 453) {
        setColumnCount('4')
      }
      if (window.innerWidth >= 453) {
        setColumnCount('5')
      }
      if (window.innerWidth >= 561) {
        setColumnCount('6')
      }
      if (window.innerWidth >= 669) {
        setColumnCount('7')
      }
    }
  })

  const [slicedItems, setSlicedItems] = useState<any[]>([])

  useEffect(() => {
    const pageCount = Math.ceil(items.length / (Number(columnCount) * 2))
    const _slicedItems: any[] = []
    for (let i = 0; i < pageCount; i++) {
      _slicedItems.push(
        items.slice(
          i * (Number(columnCount) * 2),
          (i + 1) * (Number(columnCount) * 2)
        )
      )
    }
    setSlicedItems(_slicedItems)
  }, [columnCount])

  // state of carusel
  const scrolling = useRef(false)

  const scroll = (index: number) => {
    if (!carouselApi) {
      return
    }
    setDot(index)
    carouselApi.scrollTo(index)
    stop()
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
  }, [carouselApi])

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
    <section className={styles.carousel}>
      <section
        className={styles.viewport}
        ref={carousel}
        onClickCapture={onCaptureClick}
      >
        <div className={styles.container}>
          {slicedItems?.map((its, i) => {
            return (
              <div key={i} className={styles.slide}>
                <div className={styles.content}>
                  {its?.map(
                    (
                      item: { title: string; id: string; link: string },
                      index: number
                    ) => {
                      const title = item.title || ''
                      return (
                        <a
                          key={index}
                          href={item.link || '#'}
                          className={classnames({
                            [styles.selectedChannel]:
                              selectedChannel === parseInt(item?.id || '1', 10),
                          })}
                        >
                          {title}
                        </a>
                      )
                    }
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <footer className={styles.footer}>
        <section className={styles.dots}>
          {slicedItems?.map((_, index) => (
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
