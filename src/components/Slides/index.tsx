import classNames from 'classnames'
import { useEmblaCarousel } from 'embla-carousel/react'

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
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: 'trimSnaps',
  })

  const slidesClasses = classNames({
    slides: true,
    [`bg-${bgColor}`]: !!bgColor,
  })

  return (
    <section className={slidesClasses}>
      {header}

      <section className="wrap" ref={emblaRef}>
        <ul>{children}</ul>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Slides.Item = SlideItem
