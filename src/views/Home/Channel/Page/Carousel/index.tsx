import classnames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import {
  type MouseEvent,
  // useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useNativeEventListener, useRoute } from '~/components'
import { ChannelsQuery } from '~/gql/graphql'

// import { useCarousel } from '~/components/Hook/useCarousel'
import Dot from './Dot'
import styles from './styles.module.css'

type ColumnCount = '4' | '5' | '6' | '7'

type ChannelCarouselProps = {
  channels: ChannelsQuery['channels']
}

const ChannelCarousel = ({ channels }: ChannelCarouselProps) => {
  const [dot, setDot] = useState(0)
  const [, setSnaps] = useState<any[]>([])
  const [carousel, carouselApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  })

  const { getQuery, router } = useRoute()
  const shortHash = getQuery('shortHash')

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
    const pageCount = Math.ceil(channels.length / (Number(columnCount) * 2))
    const _slicedItems: any[] = []
    for (let i = 0; i < pageCount; i++) {
      _slicedItems.push(
        channels.slice(
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
    let pageIndex = slicedItems.findIndex((item) =>
      item.find((i: any) => i.shortHash === shortHash)
    )
    if (pageIndex === -1) {
      pageIndex = 0
    }
    carouselApi.reInit()
    carouselApi.scrollTo(pageIndex)
    setDot(pageIndex)

    setSnaps(carouselApi.scrollSnapList())

    carouselApi.on('select', onSelect)
  }, [carouselApi])

  useEffect(() => {
    if (shortHash) {
      const pageIndex = slicedItems.findIndex((item) =>
        item.find((i: any) => i.shortHash === shortHash)
      )
      carouselApi?.scrollTo(pageIndex)
    }
  }, [slicedItems, shortHash])

  const firstShortHash = slicedItems[0]?.[0]?.shortHash

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
                      item: ChannelsQuery['channels'][number],
                      index: number
                    ) => {
                      const title = item.name || ''
                      return (
                        <a
                          key={index}
                          href={`/c/${item.shortHash}`}
                          className={classnames({
                            [styles.selectedChannel]:
                              shortHash === item.shortHash ||
                              (!shortHash &&
                                index === 0 &&
                                item.shortHash === firstShortHash),
                          })}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            router.push(`/c/${item.shortHash}`)
                          }}
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
        <section
          className={classnames(['page-channel-carousel-dots', styles.dots])}
        >
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
