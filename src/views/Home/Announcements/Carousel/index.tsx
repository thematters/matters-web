import { useEmblaCarousel } from 'embla-carousel/react'
import { useCallback, useEffect, useState } from 'react'

import { Button, IconClose32, useCarousel } from '~/components'

import { TEXT } from '~/common/enums'

import DropdownActions, { DropdownActionsProps } from '../DropdownActions'
import Dot from './Dot'
import styles from './styles.css'

import { AnnouncementsPublic_official_announcements as AnnouncementPublicType } from '../__generated__/AnnouncementsPublic'

type CarouselProps = {
  items: AnnouncementPublicType[]
  hide: () => void
} & DropdownActionsProps

const Carousel = ({
  type,
  setType,
  items,
  hide,
  ...controlsProps
}: CarouselProps) => {
  const [dot, setDot] = useState(0)
  // @ts-ignore
  const [snaps, setSnaps] = useState<any[]>([])
  const [carousel, carouselApi] = useEmblaCarousel({ skipSnaps: false })

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

  const { play, stop } = useCarousel(autoplay, 4000)

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

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    carouselApi.reInit()
    carouselApi.scrollTo(0)

    setDot(0)
    setSnaps(carouselApi.scrollSnapList())

    carouselApi.on('select', onSelect)
    carouselApi.on('pointerDown', stop)

    play()
  }, [items, carouselApi])

  return (
    <div className="outer">
      <div className="viewport" ref={carousel}>
        <div className="container">
          {items.map((item) => {
            if (!item.cover) {
              return null
            }
            return (
              <div key={item.id} className="slide">
                <div
                  className="slide-inner"
                  style={{ backgroundImage: `url(${item.cover})` }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="dots">
        {items.map((_, index) => (
          <Dot
            key={index}
            index={index}
            selected={index === dot}
            scroll={scroll}
          />
        ))}
      </div>

      <div className="type">
        <DropdownActions type={type} setType={setType} {...controlsProps} />
      </div>

      <div className="close">
        <Button
          spacing={[0, 0]}
          arial-label={TEXT.zh_hant.close}
          onClick={hide}
        >
          <IconClose32 size="lg" color="white" />
        </Button>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default Carousel
