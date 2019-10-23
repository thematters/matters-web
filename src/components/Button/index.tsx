import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

type ButtonSize = 'small' | 'default' | 'large' | 'xlarge'
type ButtonSpacing = 'none' | 'xtight' | 'tight' | 'default' | 'loose'
type ButtonHTMLType = 'submit' | 'reset' | 'button'
type ButtonShape = 'circle'
type ButtonBgColor =
  | 'green'
  | 'green-lighter'
  | 'gold'
  | 'red'
  | 'white'
  | 'black'
  | 'transparent'
type ButtonOutlineColor = 'green' | 'black' | 'grey'
type ButtonTextColor = 'white' | 'black' | 'grey'
type ButtonTextWeight = 'light' | 'normal'

interface BaseButtonProps {
  icon?: React.ReactNode

  size?: ButtonSize
  spacing?: ButtonSpacing
  shape?: ButtonShape
  disabled?: boolean
  block?: boolean

  bgColor?: ButtonBgColor
  outlineColor?: ButtonOutlineColor
  textColor?: ButtonTextColor
  textWeight?: ButtonTextWeight

  [key: string]: any
}

type AnchorButtonProps = {
  is: 'anchor'
  href: string
} & BaseButtonProps

type LinkButtonProps = {
  is: 'link'
  href: string
  as: string
} & BaseButtonProps

type NativeButtonProps = {
  is?: 'button'
  htmlType?: ButtonHTMLType
} & BaseButtonProps

type SpanButtonProps = {
  is: 'span'
} & BaseButtonProps

type ButtonProps =
  | AnchorButtonProps
  | LinkButtonProps
  | NativeButtonProps
  | SpanButtonProps

/**
 * Usage:
 *
 * ```jsx
 *
 * // size:small
 * <Button
 *   size="small"
 *   outlineColor="green"
 *   style={{ width: 64 }}
 *   icon={
 *     <Icon
 *       id={ICON_ADD.id}
 *       viewBox={ICON_ADD.viewBox}
 *       style={{ width: 10, height: 11 }}
 *     />
 *   }
 * >
 *   追蹤
 * </Button>
 *
 * // fixed width
 * <Button size="small" bgColor="red" style={{ width: 64 }}>
 *   取消追蹤
 * </Button>
 *
 * // is:span
 * <Button is="span" size="small" outlineColor="grey">
 *   追蹤了你
 * </Button>
 *
 * // outline
 * <Button
 *   outlineColor="black"
 *   icon={
 *     <Icon
 *       id={ICON_NEW_BRANCH.id}
 *       viewBox={ICON_NEW_BRANCH.viewBox}
 *       style={{ width: 16, height: 16 }}
 *     />
 *   }
 * >
 *   引伸
 * </Button>
 *
 * // circle
 * <Button
 *   shape="circle"
 *   bgColor="gold"
 *   icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
 * />
 *
 * // spacing
 * <Button spacing="loose" bgColor="green-lighter" outlineColor="green">
 *   2 條新評論
 * </Button>
 *
 * // disabled
 * <Button
 *   bgColor="green"
 *   disabled
 *   icon={<Icon id={ICON_POST.id} viewBox={ICON_POST.viewBox} />}
 * >
 *   送出
 * </Button>
 * ```
 *
 */

export const Button: React.FC<ButtonProps> = ({
  icon,
  size = 'default',
  spacing,
  shape,
  disabled = false,
  block = false,
  bgColor = 'white',
  outlineColor,
  textColor,
  textWeight,
  className,

  is = 'button',
  href,
  as,
  htmlType = 'button',

  children,
  ...restProps
}) => {
  const buttonClasses = classNames({
    btn: true,
    [`size-${size}`]: true,
    [spacing ? `spacing-${spacing}` : '']: !!spacing,
    [shape ? `shape-${shape}` : '']: !!shape,
    block: !!block,
    [`bg-${bgColor}`]: !!bgColor,
    outline: !!outlineColor,
    [`outline-${outlineColor}`]: !!outlineColor,
    [`text-${textColor}`]: !!textColor,
    [`text-weight-${textWeight}`]: !!textWeight,
    [className]: !!className
  })

  // anchor
  if (is === 'anchor') {
    return (
      <a href={href} className={buttonClasses} {...restProps}>
        {icon}
        {children && <span>{children}</span>}

        <style jsx>{styles}</style>
      </a>
    )
  }

  // link
  if (is === 'link') {
    return (
      <Link href={href} as={as}>
        <a className={buttonClasses} {...restProps}>
          {icon}
          {children && <span>{children}</span>}

          <style jsx>{styles}</style>
        </a>
      </Link>
    )
  }

  // span
  if (is === 'span') {
    return (
      <span className={buttonClasses} {...restProps}>
        {icon}
        {children && <span>{children}</span>}

        <style jsx>{styles}</style>
      </span>
    )
  }

  // button
  return (
    <button
      className={buttonClasses}
      type={htmlType}
      disabled={disabled}
      {...restProps}
    >
      {icon}
      {children && <span>{children}</span>}

      <style jsx>{styles}</style>
    </button>
  )
}
