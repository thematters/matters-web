import classNames from 'classnames'

import styles from './styles.css'

interface TextIconProps {
  text?: string | number | React.ReactNode
  textPlacement?: 'bottom' | 'left' | 'right'
  icon: React.ReactNode
  style?: React.CSSProperties
  color?: 'black' | 'green' | 'gold' | 'grey' | 'grey-dark' | 'white' | 'red'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  spacing?: '0' | 'xxxtight' | 'xxtight' | 'xtight' | 'tight'
  weight?: 'light' | 'normal' | 'md' | 'semibold' | 'bold'

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
  style,
  className
}) => {
  const textStyle = style && style.fontSize ? { fontSize: style.fontSize } : {}

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
      <span className={textIconClasses} style={style}>
        <span className="text" style={textStyle}>
          {text || children}
        </span>

        {icon}

        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <span className={textIconClasses} style={style}>
      {icon}

      <span className="text" style={textStyle}>
        {text || children}
      </span>

      <style jsx>{styles}</style>
    </span>
  )
}
