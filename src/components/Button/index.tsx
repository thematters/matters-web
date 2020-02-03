import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

type ButtonWidth = 'full' | '2rem' | '4rem' | '6rem' | undefined | null

type ButtonHeight =
  | '1rem'
  | '1.25rem'
  | '1.5rem'
  | '2rem'
  | '2.25rem'
  | '3rem'
  | undefined
  | null

type ButtonSpacing =
  | 0
  | '0'
  | 'xxxtight'
  | 'xxtight'
  | 'xtight'
  | 'tight'
  | 'base'
  | 'loose'

type ButtonTextColor = 'white' | 'black' | 'green' | 'red'

type ButtonColor =
  | 'white'
  | 'grey'
  | 'grey-lighter'
  | 'green-lighter'
  | 'green'
  | 'gold'
  | 'red'

interface ButtonProps {
  size?: [ButtonWidth, ButtonHeight]
  spacing?: [ButtonSpacing, ButtonSpacing]

  textColor?: ButtonTextColor
  textHoverColor?: ButtonTextColor

  bgColor?: ButtonColor
  bgHoverColor?: ButtonColor

  borderColor?: ButtonColor
  borderWidth?: 'sm'
  borderRadius?: 0 | '0' | '5rem'

  style?: React.CSSProperties

  href?: string
  as?: string

  is?: 'span'

  [key: string]: any
}

export const Button: React.FC<ButtonProps> = ({
  spacing = [0, 0],
  size = [null, null],

  textColor,
  textHoverColor,

  bgColor,
  bgHoverColor,

  borderColor,
  borderWidth,
  borderRadius = '5rem',

  href,
  as,

  is,

  style,
  className,
  children,
  ...restProps
}) => {
  const isFullWidth = size[0] === 'full'
  const isClickable = is !== 'span' && !restProps.disabled
  const containerClass = classNames({
    container: true,
    [`width-${size[0]}`]: isFullWidth,
    [`text-hover-${textHoverColor}`]: !!textHoverColor && isClickable,
    [`bg-hover-${bgHoverColor}`]: !!bgHoverColor && isClickable,
    [className]: !!className
  })
  const contentClass = classNames({
    content: true,
    [`width-${size[0]}`]: isFullWidth,
    [`spacing-vertical-${spacing[0]}`]: !!spacing[0],
    [`spacing-horizontal-${spacing[1]}`]: !!spacing[1],
    [`text-${textColor}`]: !!textColor,
    [`bg-${bgColor}`]: !!bgColor,
    [`border-${borderColor}`]: !!borderColor,
    [`border-${borderWidth}`]: !!borderWidth
  })
  const contentStyle = {
    ...style,
    ...(!!size[0] && !isFullWidth ? { width: size[0] } : {}),
    ...(!!size[1] ? { height: size[1] } : {}),
    ...(!!borderRadius ? { borderRadius } : {})
  }

  // span
  if (is === 'span') {
    return (
      <span className={containerClass} {...restProps}>
        <div className={contentClass} style={contentStyle}>
          {children}
        </div>
        <style jsx>{styles}</style>
      </span>
    )
  }

  // anchor
  if (href && !as) {
    return (
      <a href={href} className={containerClass} {...restProps}>
        <div className={contentClass} style={contentStyle}>
          {children}
        </div>
        <style jsx>{styles}</style>
      </a>
    )
  }

  // link
  if (href && as) {
    return (
      <Link href={href} as={as}>
        <a className={containerClass} {...restProps}>
          <div className={contentClass} style={contentStyle}>
            {children}
          </div>
          <style jsx>{styles}</style>
        </a>
      </Link>
    )
  }

  // button
  return (
    <button className={containerClass} {...restProps}>
      <div className={contentClass} style={contentStyle}>
        {children}
      </div>
      <style jsx>{styles}</style>
    </button>
  )
}
