import classNames from 'classnames'
import { forwardRef, useRef } from 'react'

import { KEYCODES } from '~/common/enums'
import { routerPush } from '~/common/utils'

import styles from './styles.css'

export type CardBgColor = 'grey-lighter' | 'white' | 'none'
export type CardBgHoverColor = 'grey-lighter' | 'none'
export type CardSpacing = 0 | 'xtight' | 'tight' | 'base' | 'loose'
export type CardBorderColor = 'grey-lighter'
export type CardBorderRadius = 'xtight' | 'xxtight' | 'base'

export interface CardProps {
  spacing?: [CardSpacing, CardSpacing]

  bgColor?: CardBgColor
  bgActiveColor?: CardBgHoverColor

  borderColor?: CardBorderColor
  borderRadius?: CardBorderRadius

  href?: string
  as?: string
  htmlTarget?: '_blank'

  onClick?: () => any

  ref?: any
}

export const Card: React.FC<CardProps> = forwardRef(
  (
    {
      spacing = ['base', 0],

      bgColor = 'white',
      bgActiveColor,

      borderColor,
      borderRadius,

      href,
      as,
      htmlTarget,

      onClick,

      children,
    },
    ref
  ) => {
    const disabled = !as && !href && !onClick
    const fallbackRef = useRef(null)
    const cardRef = (ref || fallbackRef) as React.RefObject<any> | null

    const cardClass = classNames({
      card: true,
      [`spacing-y-${spacing[0]}`]: !!spacing[0],
      [`spacing-x-${spacing[1]}`]: !!spacing[1],
      [`bg-${bgColor}`]: !!bgColor,
      [`bg-active-${bgActiveColor}`]: !!bgActiveColor,
      [`border-${borderColor}`]: !!borderColor,
      [`border-radius-${borderRadius}`]: !!borderRadius,

      hasBorder: !!borderColor || !!borderRadius,
      disabled,
    })
    const ariaLabel = href || as ? `跳轉至 ${as || href}` : undefined

    const openLink = ({
      newTab,
      event,
    }: {
      newTab: boolean
      event: React.MouseEvent | React.KeyboardEvent
    }) => {
      if (window.getSelection()?.toString().length) {
        return
      }

      const target = event.target as HTMLElement

      if (disabled) {
        return
      }

      // We have some trackers rely on `onClick`,
      // allow <a> and skip if it's from <button>
      if (!target.closest('button') && onClick) {
        onClick()
      }

      // skip if the inside <button> or <a> was clicked
      if (target.closest('a, button')) {
        return
      }

      // jump behavior
      if (href && !as) {
        window.open(href, htmlTarget)
      }

      if (href && as) {
        if (newTab) {
          window.open(as, '_blank')
        } else {
          routerPush(href, as)
        }
      }

      // stop bubbling if it's nested to another `<Card>`
      if (cardRef?.current?.parentElement?.closest('.card')) {
        event.stopPropagation()
      }

      // blur on click
      if (cardRef?.current) {
        cardRef.current.blur()
      }
    }

    return (
      <section
        className={cardClass}
        tabIndex={disabled ? undefined : 0}
        aria-label={ariaLabel}
        ref={cardRef}
        data-clickable
        onKeyDown={(event) => {
          if (event.keyCode !== KEYCODES.enter) {
            return
          }
          openLink({
            newTab: event.metaKey,
            event,
          })
        }}
        onClick={(event) => {
          openLink({ newTab: event.metaKey, event })
        }}
      >
        {children}

        <style jsx>{styles}</style>
      </section>
    )
  }
)
