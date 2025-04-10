import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

export type TextIconColor =
  | 'black'
  | 'green'
  | 'gold'
  | 'grey'
  | 'greyLight'
  | 'greyDarker'
  | 'greyDark'
  | 'white'
  | 'red'
  | 'likecoinGreen'
  | 'yellowLighter'
  | 'freeWriteBlue'
  | 'freeWriteGreenLabel'
  | 'attention700'
export interface TextIconProps {
  // icon
  icon?: React.ReactNode

  // icon & text
  color?: TextIconColor
  spacing?: 0 | 2 | 4 | 6 | 8 | 12 | 16

  // text
  size?: 12 | 13 | 14 | 15 | 16 | 18 | 20 | 24 | 32
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  placement?: 'bottom' | 'left' | 'right'
  decoration?: 'underline'

  allowUserSelect?: boolean

  textLineClamp?: boolean
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
  spacing = 4,

  size = 14,
  weight,
  placement = 'right',
  decoration,
  textLineClamp,

  allowUserSelect = false,

  children,
  ...restProps
}) => {
  const textIconClasses = classNames({
    textIcon: true, // global selector
    [styles.textIcon]: true,
    [color ? styles[color] : '']: !!color,
    [spacing ? styles[`spacing${spacing}`] : '']: !!spacing,
    [styles[`text${size}`]]: true,
    [styles[`text${capitalizeFirstLetter(placement)}`]]: true,
    [decoration ? styles[`text${capitalizeFirstLetter(decoration)}`] : '']:
      true,
    [textLineClamp ? styles.textLineClamp : '']: textLineClamp,
    [weight ? styles[`weight${capitalizeFirstLetter(weight)}`] : '']: !!weight,
    [styles.noneSelect]: !allowUserSelect,
    [styles.hasIcon]: !!icon,
  })

  if (placement === 'left') {
    return (
      <span className={textIconClasses} {...restProps}>
        {children && <span className={styles.text}>{children}</span>}

        {icon}
      </span>
    )
  }

  return (
    <span className={textIconClasses} {...restProps}>
      {icon}

      {children && <span className={styles.text}>{children}</span>}
    </span>
  )
}
