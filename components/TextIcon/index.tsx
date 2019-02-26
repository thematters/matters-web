import classNames from 'classnames'

import styles from './styles.css'

interface TextIconProps {
  text?: string | number
  textPlacement?: 'bottom' | 'left' | 'right'
  icon: React.ReactNode

  color?: 'black' | 'green' | 'gold' | 'grey' | 'grey-dark' | 'white' | 'red'
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  spacing?: '0' | 'xxxtight' | 'xxtight' | 'xtight' | 'tight'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

  className?: string
}

/**
 * `<TextIcon>` component that combines text and `<Icon>` to render as left-right/top-bottom layout.
 *
 * Usage:
 *
 * ```jsx
 * <TextIcon text="134" icon={<Icon id={ICON_MAT_GOLD.id} viewBox={ICON_MAT_GOLD.viewBox} />} />
 * ```
 */

export const TextIcon: React.FC<TextIconProps> = ({
  text,
  textPlacement = 'right',
  icon,
  children,
  color,
  size = 'sm',
  spacing = 'xxtight',
  weight,

  className
}) => {
  const textIconClasses = classNames({
    'text-icon': true,
    [color || '']: !!color,
    [`text-${textPlacement}`]: true,
    [`size-${size}`]: true,
    [spacing ? `spacing-${spacing}` : '']: !!spacing,
    [weight ? `weight-${weight}` : '']: !!weight,
    [className || '']: !!className
  })

  if (textPlacement === 'left') {
    return (
      <span className={textIconClasses}>
        <span className="text">{text || children}</span>
        {icon}
        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <span className={textIconClasses}>
      {icon}
      <span className="text">{text === undefined ? children : text}</span>
      <style jsx>{styles}</style>
    </span>
  )
}
