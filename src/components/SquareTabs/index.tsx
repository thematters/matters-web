import classNames from 'classnames'
import { forwardRef, useCallback, useEffect, useState } from 'react'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

type TabProps = {
  title: string | React.ReactNode
  selected?: boolean
  onClick?: () => void
  theme?: 'black' | 'gold' | 'green'
}

const Tab = forwardRef<HTMLLIElement, TabProps>(
  ({ title, selected, onClick, theme }, ref) => {
    const liClasses = classNames({
      [styles.tabItem]: true,
      [styles.selected]: selected,
      [styles.gold]: theme === 'gold',
      [styles.green]: theme === 'green',
    })

    return (
      <li
        className={liClasses}
        role="button"
        onClick={onClick}
        data-title={typeof title === 'string' ? title : ''}
        ref={ref}
      >
        {title}
      </li>
    )
  }
)

Tab.displayName = 'Tab'

interface SquareTabsProps {
  sticky?: boolean
  spacing?: 'sm' | 'md'
  side?: React.ReactNode
}

export const SquareTabs: React.FC<React.PropsWithChildren<SquareTabsProps>> & {
  Tab: typeof Tab
} = ({ children, sticky, spacing, side }) => {
  const [navElement, setNavElement] = useState<HTMLUListElement | null>(null)
  const [showLeftGradient, setShowLeftGradient] = useState(false)
  const [showRightGradient, setShowRightGradient] = useState(false)

  const checkGradients = useCallback(() => {
    if (!navElement) return

    const containerElement = navElement.parentElement
    if (!containerElement) return

    const isAtLeftMost = navElement.scrollLeft <= 0
    const isAtRightMost =
      navElement.scrollLeft + navElement.clientWidth >= navElement.scrollWidth

    const isOverflowing = navElement.scrollWidth > containerElement.clientWidth

    setShowLeftGradient(isOverflowing && !isAtLeftMost)
    setShowRightGradient(isOverflowing && !isAtRightMost)
  }, [navElement])

  useEffect(() => {
    window.addEventListener('resize', checkGradients)
    return () => {
      window.removeEventListener('resize', checkGradients)
    }
  }, [checkGradients])

  const navRef = useCallback(
    (node: HTMLUListElement | null) => {
      setNavElement(node)

      if (node) {
        node.addEventListener('scroll', checkGradients)

        setTimeout(checkGradients, 0)
      }

      if (navElement && navElement !== node) {
        navElement.removeEventListener('scroll', checkGradients)
      }
    },
    [checkGradients, navElement]
  )

  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [spacing ? styles[`spacing${capitalizeFirstLetter(spacing)}`] : '']:
      !!spacing,
    [styles.sticky]: sticky,
  })

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.showLeftGradient]: showLeftGradient,
    [styles.showRightGradient]: showRightGradient,
    [styles.hasSide]: !!side,
  })

  const listClasses = classNames({
    [styles.tabList]: true,
  })

  return (
    <section className={wrapperClasses}>
      <section className={containerClasses}>
        <ul
          role="tablist"
          className={listClasses}
          ref={navRef}
          aria-orientation="horizontal"
        >
          {children}
        </ul>
        {side}
      </section>
    </section>
  )
}

SquareTabs.Tab = Tab
