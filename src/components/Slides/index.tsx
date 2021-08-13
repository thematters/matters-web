import classNames from 'classnames'
import { useEmblaCarousel } from 'embla-carousel/react'
import { useEffect, useState } from 'react'

import styles from './styles.css'

interface SlidesProps {
  bgColor: 'yellow-lighter' | 'green-lighter' | 'grey-lighter'
  header: React.ReactNode
}

interface SlideItemProps {
  size?: 'sm' | 'md'
}

const SlideItem: React.FC<SlideItemProps> = ({ size = 'sm', children }) => {
  const slidesItemClasses = classNames({
    [`size-${size}`]: !!size,
  })

  return (
    <li className={slidesItemClasses}>
      {children}
      <style jsx>{styles}</style>
    </li>
  )
}

export const Slides: React.FC<SlidesProps> & { Item: typeof SlideItem } = ({
  bgColor,
  header,
  children,
}) => {
  const [scrolling, setScrolling] = useState(false)
  const [settled, setSettled] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: 'trimSnaps',
  })

  const slidesClasses = classNames({
    slides: true,
    [`bg-${bgColor}`]: !!bgColor,
  })

  const onCaptureClick = (event: any) => {
    if (scrolling) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('scroll', (event) => {
        if (!scrolling && settled) {
          setScrolling(true)
          setSettled(false)
        }
      })

      emblaApi.on('settle', (event) => {
        setScrolling(false)
        setSettled(true)
      })
    }
  }, [emblaApi])

  return (
    <section className={slidesClasses}>
      {header}

      <section className="wrap" ref={emblaRef} onClickCapture={onCaptureClick}>
        <ul>{children}</ul>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Slides.Item = SlideItem
