import useEmblaCarousel from 'embla-carousel-react'
import { type MouseEvent, useEffect, useRef, useState } from 'react'

import Dot from './Dot'
import styles from './styles.module.css'

const ChannelCarousel = () => {
  const items = [
    {
      id: '1',
      title: 'Item 1',
      link: 'https://www.google.com',
    },
    {
      id: '2',
      title: 'Item 2',
      link: 'https://www.google.com',
    },
    {
      id: '3',
      title: 'Item 3',
      link: 'https://www.google.com',
    },
    {
      id: '4',
      title: 'Item 4',
      link: 'https://www.google.com',
    },
    {
      id: '5',
      title: 'Item 5',
      link: 'https://www.google.com',
    },
    {
      id: '6',
      title: 'Item 6',
      link: 'https://www.google.com',
    },
    {
      id: '7',
      title: 'Item 7',
      link: 'https://www.google.com',
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

  // const autoplay = useCallback(() => {
  //   if (!carouselApi) {
  //     return
  //   }
  //   if (carouselApi.canScrollNext()) {
  //     setDot(carouselApi.selectedScrollSnap())
  //     carouselApi.scrollNext()
  //   } else {
  //     setDot(0)
  //     carouselApi.scrollTo(0)
  //   }
  // }, [carouselApi])

  // const { play, stop } = useCarousel(autoplay, 5000)

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

  console.log('items', items)

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

    // play()
  }, [carouselApi])

  return (
    <section className={styles.carousel}>
      <section
        className={styles.viewport}
        ref={carousel}
        onClickCapture={onCaptureClick}
      >
        <div className={styles.container}>
          {items?.map((item, i) => {
            // const hasTranslaton = translatedItem != null
            const title = item.title || ''

            return (
              <div key={item.id} className={styles.slide}>
                <div className={styles.content}>
                  <a href={item.link + '/search?q=' + title + 1}>{title}1</a>

                  <a href={item.link + '/search?q=' + title + 2}>{title}2</a>

                  <a href={item.link + '/search?q=' + title + 3}>{title}3</a>

                  <a href={item.link + '/search?q=' + title + 4}>{title}4</a>

                  <a href={item.link + '/search?q=' + title + 5}>{title}5</a>

                  <a href={item.link + '/search?q=' + title + 6}>{title}6</a>

                  <a href={item.link + '/search?q=' + title + 7}>{title}7</a>

                  <a href={item.link + '/search?q=' + title + 8}>{title}8</a>
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
