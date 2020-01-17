import classNames from 'classnames'
import Router from 'next/router'
import { useRef } from 'react'

import { KEYCODES } from '~/common/enums'

import styles from './styles.css'

type CardSpacing = 0 | '0' | 'xtight' | 'tight' | 'base'

interface CardProps {
  bgColor?: 'grey-lighter'
  spacing?: [CardSpacing, CardSpacing]
  textSize?: 'md-s'

  href?: string
  as?: string

  onClick?: () => any
}

export const Card: React.FC<CardProps> = ({
  bgColor,
  spacing = ['base', 0],
  textSize,

  href,
  as,

  onClick,

  children
}) => {
  const node: React.RefObject<HTMLElement> = useRef(null)
  const cardClass = classNames({
    card: true,
    [`bg-${bgColor}`]: !!bgColor,
    [`spacing-vertical-${spacing[0]}`]: !!spacing[0],
    [`spacing-horizontal-${spacing[1]}`]: !!spacing[1],
    [`text-size-${textSize}`]: !!textSize
  })
  const openLink = ({ newTab }: { newTab: boolean }) => {
    if (as && href) {
      if (newTab) {
        window.open(as, '_blank')
      } else {
        Router.push(href, as)
      }
    }

    if (onClick) {
      onClick()
    }

    if (node && node.current) {
      node.current.blur()
    }
  }

  return (
    <section
      className={cardClass}
      tabIndex={0}
      ref={node}
      onKeyDown={event => {
        if (event.keyCode === KEYCODES.enter) {
          openLink({ newTab: event.metaKey })
          event.stopPropagation()
        }
      }}
      onClick={event => {
        openLink({ newTab: event.metaKey })
        event.stopPropagation()
      }}
    >
      {children}

      <style jsx>{styles}</style>
    </section>
  )
}
