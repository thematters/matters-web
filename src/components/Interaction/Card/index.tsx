import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AriaAttributes, AriaRole, forwardRef, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { KEYVALUE, TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

export type CardBgColor =
  | 'greyLighter'
  | 'white'
  | 'transparent'
  | 'none'
  | 'campaignBlue'
export type CardBgHoverColor =
  | 'greyHover'
  | 'greyLighter'
  | 'transparent'
  | 'none'
export type CardSpacing = 0 | 8 | 10 | 12 | 16 | 20 | 24
export type CardBorderColor = 'greyLighter' | 'lineGreyLight' | 'green'
export type CardBorderRadius = 'xtight' | 'xxtight' | 'base' | 'loose'

export interface CardProps {
  spacing?: [CardSpacing, CardSpacing]

  bgColor?: CardBgColor
  bgActiveColor?: CardBgHoverColor

  borderColor?: CardBorderColor
  borderRadius?: CardBorderRadius

  textColor?: 'black' | 'greyDarker' | 'red'
  textActiveColor?: 'black' | 'redDark'

  isActive?: boolean
  activeOutline?: 'auto'

  href?: string

  htmlHref?: string
  htmlTarget?: '_blank'

  onClick?: () => any

  ref?: any

  is?: 'link' | 'anchor' | 'section'

  role?: AriaRole
  ariaHasPopup?: AriaAttributes['aria-haspopup']
  testId?: TEST_ID
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = forwardRef(
  (
    {
      spacing = [16, 0],

      bgColor = 'white',
      bgActiveColor,

      borderColor,
      borderRadius,

      textColor,
      textActiveColor,

      isActive,
      activeOutline,

      href,

      htmlHref,
      htmlTarget,

      onClick,

      is = 'section',

      role,
      ariaHasPopup,
      testId,

      children,
    },
    ref
  ) => {
    const router = useRouter()
    const intl = useIntl()

    const disabled = !href && !htmlHref && !onClick
    const fallbackRef = useRef(null)
    const cardRef = (ref || fallbackRef) as React.RefObject<any> | null

    const cardClasses = classNames({
      [styles.card]: true,
      card: true, // global selector for overriding
      [styles[`spacingY${capitalizeFirstLetter(spacing[0] + '')}`]]:
        !!spacing[0],
      [styles[`spacingX${capitalizeFirstLetter(spacing[1] + '')}`]]:
        !!spacing[1],
      [styles[`bg${capitalizeFirstLetter(bgColor)}`]]: !!bgColor,
      [bgActiveColor
        ? styles[`bgActive${capitalizeFirstLetter(bgActiveColor)}`]
        : '']: !!bgActiveColor,
      [borderColor
        ? styles[`border${capitalizeFirstLetter(borderColor)}`]
        : '']: !!borderColor,
      [borderRadius
        ? styles[`borderRadius${capitalizeFirstLetter(borderRadius)}`]
        : '']: !!borderRadius,
      [styles.activeOutlineAuto]: !!activeOutline,

      [styles.hasBorder]: !!borderColor || !!borderRadius,
      [styles.disabled]: disabled,
      [styles[textColor ? `text${capitalizeFirstLetter(textColor)}` : '']]:
        !!textColor,
      [styles[
        textActiveColor
          ? `textActive${capitalizeFirstLetter(textActiveColor)}`
          : ''
      ]]: !!textActiveColor,
    })
    const ariaLabel =
      htmlHref || href
        ? intl.formatMessage(
            {
              defaultMessage: 'Go to {href}',
              id: 'mJEqC/',
            },
            {
              href: href || htmlHref,
            }
          )
        : undefined

    const openLink = ({
      newTab,
      event,
    }: {
      newTab: boolean
      event: React.MouseEvent | React.KeyboardEvent
    }) => {
      const target = event.target as HTMLElement

      if (disabled) {
        return
      }

      // skip if there is text selection
      const selection = window.getSelection()
      const selectedText = selection?.toString() || ''
      const selectedNode = selection?.anchorNode?.parentNode
      if (
        selectedText?.length > 0 &&
        selectedNode &&
        target.contains(selectedNode)
      ) {
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
      if (htmlHref) {
        window.open(htmlHref, htmlTarget)
      }

      if (href) {
        if (newTab && href) {
          window.open(href, '_blank')
        } else {
          router.push(href)
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

    useEffect(() => {
      if (cardRef && isActive) {
        cardRef.current.focus()
      }
    }, [cardRef, isActive])

    const props = {
      className: cardClasses,
      ref: cardRef,
      'data-clickable': true,
      onClick,
      ...(ariaLabel && disabled ? { ['aria-label']: ariaLabel } : {}),
      ...(ariaHasPopup && disabled ? { ['aria-haspopup']: ariaHasPopup } : {}),
      ...(disabled ? { ['aria-disabled']: disabled } : {}),
      ...(testId ? { ['data-test-id']: testId } : {}),
    }

    if (is === 'link' && href) {
      return (
        <Link href={href} legacyBehavior>
          <a {...props}>{children}</a>
        </Link>
      )
    }

    if (is === 'anchor' && htmlHref) {
      return (
        <a href={htmlHref} target={htmlTarget} {...props}>
          {children}
        </a>
      )
    }

    return (
      <section
        {...props}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(event) => {
          if (event.key.toLowerCase() !== KEYVALUE.enter) {
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
        {...(role
          ? { ['role']: role }
          : !disabled
            ? { ['role']: 'button' }
            : {})}
      >
        {children}
      </section>
    )
  }
)

Card.displayName = 'Card'
