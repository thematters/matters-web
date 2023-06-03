import classNames from 'classnames'

import styles from './styles.module.css'

type TextIconColor =
  | 'black'
  | 'green'
  | 'gold'
  | 'grey'
  | 'grey-light'
  | 'grey-darker'
  | 'grey-dark'
  | 'white'
  | 'red'
  | 'likecoin-green'
  | 'yellow-lighter'

export interface TextIconProps {
  icon?: React.ReactNode

  color?: TextIconColor
  size?: 'xs' | 'sm' | 'sm-s' | 'md-s' | 'md' | 'xm' | 'lg' | 'xl'
  spacing?: 0 | 'xxxtight' | 'xxtight' | 'xtight' | 'tight' | 'base'
  weight?: 'light' | 'normal' | 'md' | 'semibold' | 'bold'
  allowUserSelect?: boolean

  textPlacement?: 'bottom' | 'left' | 'right'
  textDecoration?: 'underline'
}

/**
 * `<TextIcon>` component that combines text and `<Icon>` to render as left-right/top-bottom layout.
 *
 * Usage:
 *
 * ```jsx
 * <TextIcon
 *   icon={<Icon id={ICON_MAT_GOLD.id}
 *   viewBox={ICON_MAT_GOLD.viewBox}
 * >
 *  123
 * </TextIcon>} />
 * ```
 */

export const TextIcon: React.FC<React.PropsWithChildren<TextIconProps>> = ({
  icon,

  color,
  size = 'sm',
  spacing = 'xxtight',
  weight,
  allowUserSelect = false,

  textPlacement = 'right',
  textDecoration,

  children,
}) => {
  const textIconClasses = classNames({
    'text-icon': true,
    'none-select': !allowUserSelect,
    [color || '']: !!color,
    [`text-${textPlacement}`]: true,
    [`text-${textDecoration}`]: true,
    [`size-${size}`]: true,
    [spacing ? `spacing-${spacing}` : '']: !!spacing,
    [weight ? `weight-${weight}` : '']: !!weight,
    hasIcon: !!icon,
  })

  if (textPlacement === 'left') {
    return (
      <span className={textIconClasses}>
        {children && <span className={styles['text']}>{children}</span>}

        {icon}
      </span>
    )
  }

  return (
    <span className={textIconClasses}>
      {icon}

      {children && <span className={styles['text']}>{children}</span>}
    </span>
  )
}
