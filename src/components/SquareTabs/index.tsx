import classNames from 'classnames'
import { forwardRef, useCallback, useState } from 'react'

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
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    null
  )
  const [showLeftGradient, setShowLeftGradient] = useState(false)
  const [showRightGradient, setShowRightGradient] = useState(false)

  const navRef = useCallback(
    (node: HTMLUListElement | null) => {
      if (node) {
        setNavElement(node)

        node.addEventListener('scroll', calculateGradient)

        if (
          containerElement &&
          node.scrollWidth > containerElement.clientWidth
        ) {
          calculateGradient()
        }
      }

      if (navElement && navElement !== node) {
        navElement.removeEventListener('scroll', calculateGradient)
      }
    },
    [containerElement]
  )

  const containerRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        setContainerElement(node)

        if (navElement && navElement.scrollWidth > node.clientWidth) {
          calculateGradient()
        }
      }
    },
    [navElement]
  )

  const calculateGradient = useCallback(() => {
    if (!navElement || !containerElement) return

    const isAtLeftMost = navElement.scrollLeft <= 0
    const isAtRightMost =
      navElement.scrollLeft + navElement.clientWidth >= navElement.scrollWidth

    setShowLeftGradient(!isAtLeftMost)
    setShowRightGradient(!isAtRightMost)
  }, [navElement, containerElement])

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
      <section className={containerClasses} ref={containerRef}>
        <ul role="tablist" className={listClasses} ref={navRef}>
          {children}
        </ul>
        {side}
      </section>
    </section>
  )
}

SquareTabs.Tab = Tab
