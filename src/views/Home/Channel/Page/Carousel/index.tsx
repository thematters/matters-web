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

type ChannelCarouselProps = {
  items: {
    id: string
    title: string
    link: string
  }[]
}

const ChannelCarousel = ({ items }: ChannelCarouselProps) => {
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
