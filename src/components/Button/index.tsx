import classNames from 'classnames'
import Link from 'next/link'
import { forwardRef, RefObject, useRef } from 'react'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

export type ButtonWidth =
  | '1.125rem'
  | '2rem'
  | '2.5rem'
  | '3rem'
  | '3.25rem'
  | '3.75rem'
  | '4rem'
  | '5rem'
  | '5.3125rem'
  | '5.5rem'
  | '6rem'
  | '7rem'
  | '7.5rem'
  | '8rem'
  | '10.5rem'
  | '19.5rem'
  | '100%'
  | undefined
  | null

export type ButtonHeight =
  | '1rem'
  | '1.125rem'
  | '1.25rem'
  | '1.5rem'
  | '1.625rem'
  | '1.75rem'
  | '1.875rem'
  | '2rem'
  | '2.25rem'
  | '2.5rem'
  | '3rem'
  | undefined
  | null

export type ButtonSpacingY = 0 | 4 | 8 | 10 | 12 | 16

export type ButtonSpacingX = 0 | 4 | 8 | 10 | 12 | 16 | 20 | 24

type ButtonColor =
  | 'white'
  | 'whiteLight'
  | 'black'
  | 'halfBlack'
  | 'greyDark'
  | 'greyDarker'
  | 'greyDarkest'
  | 'grey'
  | 'greyLight'
  | 'greyLighter'
  | 'greyLighterActive'
  | 'greenLighter'
  | 'greenDark'
  | 'green'
  | 'gold'
  | 'red'
  | 'redDark'
  | 'likecoinGreen'
  | 'yellowLighter'
  | 'goldLinearGradient'

type ButtonTextColor = Extract<
  ButtonColor,
  | 'white'
  | 'whiteLight'
  | 'black'
  | 'green'
  | 'gold'
  | 'red'
  | 'grey'
  | 'greyDark'
  | 'greyDarker'
>

type ButtonTextActiveColor = Extract<
  ButtonColor,
  'white' | 'black' | 'green' | 'greenDark' | 'redDark' | 'greyDarker'
>

export type ButtonBgColor = Extract<
  ButtonColor,
  | 'greyDarkest'
  | 'greyDarker'
  | 'grey'
  | 'greyLighter'
  | 'greenLighter'
  | 'green'
  | 'gold'
  | 'red'
  | 'white'
  | 'halfBlack'
  | 'black'
  | 'yellowLighter'
  | 'goldLinearGradient'
>

type ButtonBgActiveColor = Extract<
  ButtonColor,
  | 'greyLighter'
  | 'greyLight'
  | 'greenLighter'
  | 'greyLighterActive'
  | 'green'
  | 'gold'
  | 'red'
>

type ButtonBorderActiveColor = Extract<
  ButtonColor,
  'greenDark' | 'black' | 'greyLight' | 'grey'
>

export type ButtonProps = {
  size?: [ButtonWidth, ButtonHeight]
  spacing?: [ButtonSpacingY, ButtonSpacingX]

  textColor?: ButtonTextColor
  textActiveColor?: ButtonTextActiveColor

  bgColor?: ButtonBgColor
  bgActiveColor?: ButtonBgActiveColor

  borderColor?: ButtonColor
  borderActiveColor?: ButtonBorderActiveColor
  borderWidth?: 'sm' | 'md'
  borderRadius?: 0 | '0.5rem' | '0.75rem' | '5rem'

  href?: string
  replace?: boolean

  is?: 'span'
  className?: string
  ref?:
    | RefObject<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>
    | ((
        instance: HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
      ) => void)
    | null
    | undefined

  // navtive props
  htmlHref?: string
  htmlTarget?: '_blank'
  type?: 'button' | 'submit'
  disabled?: boolean
  form?: string
  rel?: string
  testId?: string
  tabIndex?: number
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseEnter?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

/**
 * `<Button>` is an inline-block element with centered children.
 *
 * Usage:
 *
 * ```jsx
 *  // with custom spacing
 *  <Button
 *    spacing={[8, 8]}
 *    onClick={onClick}
 *  >
 *    <Icon icon={IconSave} />
 *  </Button>
 *
 *  // with custom size, border, hover text & background
 *  <Button
 *    size={['4rem', '1.5rem']}
 *    textColor="green"
 *    textActiveColor="white"
 *    bgActiveColor="green"
 *    borderColor="green"
 *    onClick={onClick}
 *  >
 *    <TextIcon weight="medium" size={12}>
 *      Follow
 *    </TextIcon>
 *  </Button>
 * ```
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement,
  React.PropsWithChildren<ButtonProps>
>(
  (
    {
      spacing = [0, 0],
      size = [null, null],

      textColor,
      textActiveColor,

      bgColor,
      bgActiveColor,

      borderColor,
      borderActiveColor,
      borderWidth = 'md',
      borderRadius = '5rem',

      href,
      replace,

      is,
      className,
      htmlHref,
      htmlTarget,
      type = 'button',

      children,
      testId,
      ...restProps
    },
    ref
  ) => {
    const fallbackRef = useRef(null)
    const buttonRef = (ref || fallbackRef) as React.RefObject<
      HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
    > | null

    const isClickable = is !== 'span' && !restProps.disabled
    const isTransparent = !bgColor && !borderColor
    const [width, height] = size
    const [spacingY, spacingX] = spacing

    // container
    const containerClasses = classNames({
      [styles.container]: true,
      [styles.isTransparent]: isTransparent,
      [styles.centeringX]: width && isTransparent,
      [styles.centeringY]: height && isTransparent,
      [styles[`spacingY${capitalizeFirstLetter(spacingY + '')}`]]: !!spacingY,
      [styles[`spacingX${capitalizeFirstLetter(spacingX + '')}`]]: !!spacingX,
      [bgColor ? styles[`bg${capitalizeFirstLetter(bgColor)}`] : '']: !!bgColor,
      [bgActiveColor
        ? styles[`bgActive${capitalizeFirstLetter(bgActiveColor)}`]
        : '']: !!bgActiveColor && isClickable,
      [borderColor
        ? styles[`border${capitalizeFirstLetter(borderColor)}`]
        : '']: !!borderColor,
      [borderActiveColor
        ? styles[`borderActive${capitalizeFirstLetter(borderActiveColor)}`]
        : '']: !!borderActiveColor && isClickable,
      [styles[`border${capitalizeFirstLetter(borderWidth)}`]]:
        borderWidth && borderColor,
      [textColor ? styles[`text${capitalizeFirstLetter(textColor)}`] : '']:
        !!textColor,
      [textActiveColor
        ? styles[`textActive${capitalizeFirstLetter(textActiveColor)}`]
        : '']: !!textActiveColor && isClickable,
      [`${className}`]: !!className,
    })

    // handle click
    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (restProps.onClick) {
        restProps.onClick(event)
      }

      // blur on click
      if (buttonRef?.current) {
        buttonRef.current.blur()
      }
    }

    const containerProps = {
      ...restProps,
      onClick,
      className: containerClasses,
      ...(testId ? { ['data-test-id']: testId } : {}),
    }

    const sizeStyle = {
      width: (!isTransparent && width) || undefined,
      height: (!isTransparent && height) || undefined,
    }

    // hotarea
    const hotAreaStyle = {
      width: width || undefined,
      height: height || undefined,
      borderRadius,
    }

    // span
    if (is === 'span') {
      return (
        <span
          {...containerProps}
          ref={buttonRef as React.RefObject<HTMLSpanElement>}
          style={sizeStyle}
        >
          <div className={styles.content} style={sizeStyle}>
            <div className={styles.hotarea} style={hotAreaStyle} />
            {children}
          </div>
        </span>
      )
    }

    // anchor
    if (htmlHref) {
      return (
        <a
          href={htmlHref}
          target={htmlTarget}
          {...containerProps}
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          style={sizeStyle}
        >
          <div className={styles.content} style={sizeStyle}>
            <div className={styles.hotarea} style={hotAreaStyle} />
            {children}
          </div>
        </a>
      )
    }

    // link
    if (href) {
      return (
        <Link
          href={href}
          replace={replace}
          {...containerProps}
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          style={sizeStyle}
        >
          <div className={styles.content} style={sizeStyle}>
            <div className={styles.hotarea} style={hotAreaStyle} />
            {children}
          </div>
        </Link>
      )
    }

    // button
    return (
      <button
        {...containerProps}
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type={type}
        style={sizeStyle}
      >
        <div className={styles.content} style={sizeStyle}>
          <div className={styles.hotarea} style={hotAreaStyle} />
          {children}
        </div>
      </button>
    )
  }
)

Button.displayName = 'Button'
