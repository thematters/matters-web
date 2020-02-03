import classNames from 'classnames'
import Router from 'next/router'
import { useRef } from 'react'

import { KEYCODES } from '~/common/enums'

import styles from './styles.css'

export type CardBgColor = 'grey-lighter'
export type CardSpacing = 0 | '0' | 'xtight' | 'tight' | 'base'
export type CardBorderColor = 'grey-lighter'
export type CardBorderRadius = 'xtight' | 'xxtight'

export interface CardProps {
  bgColor?: CardBgColor
  spacing?: [CardSpacing, CardSpacing]
  textSize?: 'md-s'
  border?: CardBorderColor
  borderRadius?: CardBorderRadius

  href?: string
  as?: string

  onClick?: () => any
}

export const Card: React.FC<CardProps> = ({
  bgColor,
  spacing = ['base', 0],
  textSize,
  border,
  borderRadius,

  href,
  as,

  onClick,

  children
}) => {
  const disable = !as || !href
  const node: React.RefObject<HTMLElement> = useRef(null)
  const cardClass = classNames({
    card: true,
    [`bg-${bgColor}`]: !!bgColor,
    [`spacing-vertical-${spacing[0]}`]: !!spacing[0],
    [`spacing-horizontal-${spacing[1]}`]: !!spacing[1],
    [`text-size-${textSize}`]: !!textSize,
    hasBorder: !!border || !!borderRadius,
    [`border-${border}`]: !!border,
    [`border-radius-${borderRadius}`]: !!borderRadius,
    disable
  })
  const openLink = ({
    newTab,
    target
  }: {
    newTab: boolean
    target: HTMLElement
  }) => {
    // disable if the inside `<Button>` is clicked
    if (target?.closest && target.closest('[data-clickable]')) {
      return
    }

    // determine if it opens on a new tab
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
      tabIndex={disable ? undefined : 0}
      ref={node}
      onKeyDown={event => {
        if (event.keyCode !== KEYCODES.enter) {
          return
        }
        openLink({
          newTab: event.metaKey,
          target: event.target as HTMLElement
        })
        event.stopPropagation()
      }}
      onClick={event => {
        openLink({ newTab: event.metaKey, target: event.target as HTMLElement })
        event.stopPropagation()
      }}
    >
      {children}

      <style jsx>{styles}</style>
    </section>
  )
}
