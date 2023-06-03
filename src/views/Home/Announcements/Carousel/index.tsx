import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import {
  BannerExposureTracker,
  Card,
  LanguageContext,
  ResponsiveImage,
  useCarousel,
} from '~/components'
import { VisibleAnnouncementsQuery } from '~/gql/graphql'

import Dot from './Dot'
import styles from './styles.module.css'

type CarouselProps = {
  items: VisibleAnnouncementsQuery['official']['announcements']
}

const Carousel = ({ items }: CarouselProps) => {
  const { lang } = useContext(LanguageContext)
  const [dot, setDot] = useState(0)
  const [, setSnaps] = useState<any[]>([])
  const [carousel, carouselApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  })

  // state of carusel
  const scrolling = useRef(false)
  const settled = useRef(true)

  const autoplay = useCallback(() => {
    if (!carouselApi) {
      return
    }
    if (carouselApi.canScrollNext()) {
      setDot(carouselApi.selectedScrollSnap())
      carouselApi.scrollNext()
    } else {
      setDot(0)
      carouselApi.scrollTo(0)
    }
  }, [carouselApi])

  const { play, stop } = useCarousel(autoplay, 5000)

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

  const onCaptureClick = (event: any) => {
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

    carouselApi.on('pointerDown', stop)
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

    play()
  }, [items, carouselApi])

  return (
    <section className={styles['carousel']}>
      <header className={styles.header}>
        <div className={styles['left']}>
          <section className={styles['dots']}>
            {items?.map((_, index) => (
              <Dot
                key={index}
                index={index}
                selected={index === dot}
                scroll={scroll}
              />
            ))}
          </section>
        </div>
      </header>

      <section
        className={styles['viewport']}
        ref={carousel}
        onClickCapture={onCaptureClick}
      >
        <div className={styles['container']}>
          {items?.map((item, i) => {
            if (!item.cover) {
              return null
            }

            const translatedItem = item.translations?.find(
              (translated) => translated.language === lang
            )

            // const hasTranslaton = translatedItem != null
            const title = (translatedItem?.title ?? item.title) || ''
            const itemLink = (translatedItem?.link ?? item.link) || ''
            const itemContent = translatedItem?.content ?? item.content
            return (
              <div key={item.id} className={styles['slide']}>
                <Card htmlHref={itemLink} spacing={[0, 0]} bgActiveColor="none">
                  <div className={styles['content']}>
                    <ResponsiveImage url={item.cover} size="1280w" />
                    <h3>{title}</h3>
                    <p>{itemContent}</p>
                  </div>
                  <BannerExposureTracker
                    id={item.id}
                    location={i}
                    title={title}
                    link={itemLink}
                    // content={itemContent}
                    lang={lang}
                  />
                </Card>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}

export default Carousel
