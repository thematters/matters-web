import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'

type TabProps = {
  title: string
  selected?: boolean
  onClick: () => void
  theme?: 'black' | 'gold'
}

const Tab = ({ title, selected, onClick, theme }: TabProps) => {
  const liClasses = classNames({
    [styles.tabItem]: true,
    [styles.selected]: selected,
    [styles.gold]: theme === 'gold',
  })
  return (
    <li
      className={liClasses}
      role="button"
      onClick={onClick}
      data-title={title}
    >
      {title}
    </li>
  )
}

interface SquareTabsProps {
  sticky?: boolean
}

export const SquareTabs: React.FC<React.PropsWithChildren<SquareTabsProps>> & {
  Tab: typeof Tab
} = ({ children, sticky }) => {
  const navRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const $nav = navRef.current
  const $container = containerRef.current
  const [showLeftGradient, setShowLeftGradient] = useState(false)
  const [showRightGradient, setShowRightGradient] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const isTabsOverflowing = () => {
    const $nav = navRef.current
    const $container = containerRef.current
    if (!$nav || !$container) return false
    return $nav.scrollWidth > $container.clientWidth
  }

  const calculateGradient = () => {
    if (!$nav || !$container) return

    const isAtLeftMost = $nav.scrollLeft <= 0
    const isAtRightMost = $nav.scrollLeft + $nav.clientWidth >= $nav.scrollWidth

    setShowLeftGradient(!isAtLeftMost)
    setShowRightGradient(!isAtRightMost)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!$nav) return
    setIsDragging(true)
    setStartX(e.pageX - $nav.offsetLeft)
    setScrollLeft($nav.scrollLeft)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !$nav) return
    const x = e.pageX - $nav.offsetLeft
    const walk = (x - startX) * 2 // scroll-fast
    $nav.scrollLeft = scrollLeft - walk
    calculateGradient()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (!isTabsOverflowing() || !$nav) return

    // initial gradient
    calculateGradient()

    $nav.addEventListener('scroll', calculateGradient)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      $nav.removeEventListener('scroll', calculateGradient)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [$nav, $container, isDragging])

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.showLeftGradient]: showLeftGradient,
    [styles.showRightGradient]: showRightGradient,
  })

  const navClasses = classNames({
    [styles.tabList]: true,
    [styles.sticky]: sticky,
  })

  return (
    <section className={containerClasses} ref={containerRef}>
      <ul
        role="tablist"
        className={navClasses}
        ref={navRef}
        onMouseDown={handleMouseDown}
      >
        {children}
      </ul>
    </section>
  )
}

SquareTabs.Tab = Tab
