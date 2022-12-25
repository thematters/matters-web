import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AriaAttributes, AriaRole, forwardRef, useContext, useRef } from 'react'

import { LanguageContext } from '~/components'

import { KEYCODES, TEST_ID } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

export type CardBgColor = 'grey-lighter' | 'white' | 'none'
export type CardBgHoverColor = 'grey-lighter' | 'none'
export type CardSpacing = 0 | 'xtight' | 'tight' | 'base' | 'loose'
export type CardBorderColor = 'grey-lighter' | 'line-grey-light'
export type CardBorderRadius = 'xtight' | 'xxtight' | 'base'

export interface CardProps {
  spacing?: [CardSpacing, CardSpacing]

  bgColor?: CardBgColor
  bgActiveColor?: CardBgHoverColor

  borderColor?: CardBorderColor
  borderRadius?: CardBorderRadius

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
      spacing = ['base', 0],

      bgColor = 'white',
      bgActiveColor,

      borderColor,
      borderRadius,

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
    const { lang } = useContext(LanguageContext)

    const disabled = !href && !htmlHref && !onClick
    const fallbackRef = useRef(null)
    const cardRef = (ref || fallbackRef) as React.RefObject<any> | null

    const cardClasses = classNames({
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
    const ariaLabel =
      htmlHref || href
        ? translate({
            zh_hant: `跳轉至 ${href || htmlHref}`,
            zh_hans: `跳转至 ${href || htmlHref}`,
            en: `Go to ${href || htmlHref}`,
            lang,
          })
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

    if (is === 'link' && href) {
      return (
        <Link href={href}>
          <a
            className={cardClasses}
            ref={cardRef}
            {...(testId ? { ['data-test-id']: testId } : {})}
          >
            {children}
            <style jsx>{styles}</style>
          </a>
        </Link>
      )
    }

    if (is === 'anchor' && htmlHref) {
      return (
        <a
          className={cardClasses}
          href={htmlHref}
          target={htmlTarget}
          ref={cardRef}
          {...(testId ? { ['data-test-id']: testId } : {})}
        >
          {children}
          <style jsx>{styles}</style>
        </a>
      )
    }

    return (
      <section
        className={cardClasses}
        tabIndex={disabled ? -1 : 0}
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
        {...(ariaLabel ? { ['aria-label']: ariaLabel } : {})}
        {...(role ? { ['role']: role } : {})}
        {...(ariaHasPopup ? { ['aria-haspopup']: ariaHasPopup } : {})}
        {...(testId ? { ['data-test-id']: testId } : {})}
      >
        {children}

        <style jsx>{styles}</style>
      </section>
    )
  }
)
