import { useEmblaCarousel } from 'embla-carousel/react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import {
  Button,
  Card,
  IconClose32,
  LanguageContext,
  ResponsiveImage,
  useCarousel,
} from '~/components'

import { translate } from '~/common/utils'

import DropdownActions, { DropdownActionsProps } from '../DropdownActions'
import Dot from './Dot'
import styles from './styles.css'

import { VisibleAnnouncements_official_announcements as VisibleAnnouncementsType } from '../__generated__/VisibleAnnouncements'

type CarouselProps = {
  items: VisibleAnnouncementsType[]
  hide: () => void
} & DropdownActionsProps

const Carousel = ({
  type,
  setType,
  items,
  hide,
  ...controlsProps
}: CarouselProps) => {
  const { lang } = useContext(LanguageContext)

  const [dot, setDot] = useState(0)
  // @ts-ignore
  const [snaps, setSnaps] = useState<any[]>([])
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
    <section className="carousel">
      <header>
        <div className="left">
          <DropdownActions type={type} setType={setType} {...controlsProps} />

          <section className="dots">
            {items.map((_, index) => (
              <Dot
                key={index}
                index={index}
                selected={index === dot}
                scroll={scroll}
              />
            ))}
          </section>
        </div>

        <Button
          spacing={[0, 0]}
          aria-label={translate({ id: 'close', lang })}
          onClick={hide}
        >
          <IconClose32 size="lg" color="white" />
        </Button>
      </header>

      <section
        className="viewport"
        ref={carousel}
        onClickCapture={onCaptureClick}
      >
        <div className="container">
          {items.map((item) => {
            if (!item.cover) {
              return null
            }

            return (
              <div key={item.id} className="slide">
                <Card htmlHref={item.link || ''} spacing={[0, 0]}>
                  <div className="content">
                    <ResponsiveImage
                      url={item.cover}
                      size="540w"
                      smUpSize="1080w"
                    />
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Carousel
