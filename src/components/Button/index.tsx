import classNames from 'classnames'
import Link from 'next/link'
import { forwardRef, RefObject, useRef } from 'react'

import styles from './styles.module.css'

export type ButtonWidth =
  | '2rem'
  | '3rem'
  | '3.25rem'
  | '4rem'
  | '5rem'
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
  | '1.25rem'
  | '1.5rem'
  | '1.75rem'
  | '2rem'
  | '2.25rem'
  | '2.5rem'
  | '3rem'
  | undefined
  | null

export type ButtonSpacingY = 0 | 'xxtight' | 'xtight' | 'tight' | 'base'

export type ButtonSpacingX =
  | 0
  | 'xxtight'
  | 'xtight'
  | 'tight'
  | 'base'
  | 'loose'

type ButtonColor =
  | 'white'
  | 'black'
  | 'half-black'
  | 'grey-darkest'
  | 'grey'
  | 'grey-light'
  | 'grey-lighter'
  | 'grey-lighter-active'
  | 'green-lighter'
  | 'green'
  | 'gold'
  | 'red'
  | 'likecoin-green'
  | 'yellow-lighter'
  | 'gold-linear-gradient'

type ButtonTextColor = Extract<
  ButtonColor,
  'white' | 'black' | 'green' | 'gold' | 'red' | 'grey'
>

export type ButtonBgColor = Extract<
  ButtonColor,
  | 'grey-darkest'
  | 'grey'
  | 'grey-lighter'
  | 'green-lighter'
  | 'green'
  | 'gold'
  | 'red'
  | 'white'
  | 'half-black'
  | 'black'
  | 'yellow-lighter'
  | 'gold-linear-gradient'
>

type ButtonBgActiveColor = Extract<
  ButtonColor,
  | 'grey-lighter'
  | 'green-lighter'
  | 'grey-lighter-active'
  | 'green'
  | 'gold'
  | 'red'
>

export type ButtonProps = {
  size?: [ButtonWidth, ButtonHeight]
  spacing?: [ButtonSpacingY, ButtonSpacingX]

  textColor?: ButtonTextColor
  textActiveColor?: ButtonTextColor

  bgColor?: ButtonBgColor
  bgActiveColor?: ButtonBgActiveColor

  borderColor?: ButtonColor
  borderWidth?: 'sm' | 'md'
  borderRadius?: 0 | '5rem'

  href?: string
  replace?: boolean

  is?: 'span'

  ref?: RefObject<any> | ((instance: any) => void) | null | undefined

  // navtive props
  htmlHref?: string
  htmlTarget?: '_blank'
  type?: 'button' | 'submit'
  disabled?: boolean
  form?: string
  rel?: string
  tabIndex?: number
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
  onMouseEnter?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
  onMouseLeave?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}

/**
 * `<Button>` is an inline-block element with centered children.
 *
 * Usage:
 *
 * ```jsx
 *  // with custom spacing
 *  <Button
 *    spacing={['xtight', 'xtight']}
 *    onClick={onClick}
 *  >
 *    <IconBookmarked16 />
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
 *    <TextIcon weight="md" size="xs">
 *      <Translate id="follow" />
 *    </TextIcon>
 *  </Button>
 * ```
 */
export const Button: React.FC<React.PropsWithChildren<ButtonProps>> =
  forwardRef(
    (
      {
        spacing = [0, 0],
        size = [null, null],

        textColor,
        textActiveColor,

        bgColor,
        bgActiveColor,

        borderColor,
        borderWidth = 'md',
        borderRadius = '5rem',

        href,
        replace,

        is,

        htmlHref,
        htmlTarget,
        type = 'button',

        children,
        ...restProps
      },
      ref
    ) => {
      const fallbackRef = useRef(null)
      const buttonRef = (ref || fallbackRef) as React.RefObject<any> | null

      const isClickable = is !== 'span' && !restProps.disabled
      const isTransparent = !bgColor && !borderColor
      const [width, height] = size
      const [spacingY, spacingX] = spacing

      // container
      const containerClasses = classNames({
        container: true,
        isTransparent,
        'centering-x': width && isTransparent,
        'centering-y': height && isTransparent,
        [`spacing-y-${spacingY}`]: !!spacingY,
        [`spacing-x-${spacingX}`]: !!spacingX,
        [`bg-${bgColor}`]: !!bgColor,
        [`bg-active-${bgActiveColor}`]: !!bgActiveColor && isClickable,
        [`border-${borderColor}`]: !!borderColor,
        [`border-${borderWidth}`]: borderWidth && borderColor,
        [`text-${textColor}`]: !!textColor,
        [`text-active-${textActiveColor}`]: !!textActiveColor && isClickable,
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
        ref: buttonRef as React.RefObject<any>,
        className: containerClasses,
      }

      // content
      const contentStyle = {
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
          <span {...containerProps}>
            <div className="content" style={contentStyle}>
              <div className="hotarea" style={hotAreaStyle} />
              {children}
            </div>
          </span>
        )
      }

      // anchor
      if (htmlHref) {
        return (
          <a href={htmlHref} target={htmlTarget} {...containerProps}>
            <div className="content" style={contentStyle}>
              <div className="hotarea" style={hotAreaStyle} />
              {children}
            </div>
          </a>
        )
      }

      // link
      if (href) {
        return (
          <Link href={href} replace={replace} legacyBehavior>
            <a {...containerProps}>
              <div className="content" style={contentStyle}>
                <div className="hotarea" style={hotAreaStyle} />
                {children}
              </div>
            </a>
          </Link>
        )
      }

      // button
      return (
        <button {...containerProps} type={type}>
          <div className="content" style={contentStyle}>
            <div className="hotarea" style={hotAreaStyle} />
            {children}
          </div>
        </button>
      )
    }
  )

Button.displayName = 'Button'
