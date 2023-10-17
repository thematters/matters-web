import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

type TextIconColor =
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

export interface TextIconProps {
  icon?: React.ReactNode

  color?: TextIconColor
  size?: 'xs' | 'sm' | 'smS' | 'mdS' | 'md' | 'xm' | 'lg' | 'xl'
  spacing?:
    | 0
    | 'xxxtight'
    | 'xxtight'
    | 'basexxtight'
    | 'xtight'
    | 'tight'
    | 'base'
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
    [styles.textIcon]: true,
    textIcon: true, // global selector
    [styles.noneSelect]: !allowUserSelect,
    [color ? styles[color] : '']: !!color,
    [styles[`text${capitalizeFirstLetter(textPlacement)}`]]: true,
    [textDecoration
      ? styles[`text${capitalizeFirstLetter(textDecoration)}`]
      : '']: true,
    [styles[`size${capitalizeFirstLetter(size)}`]]: true,
    [spacing ? styles[`spacing${capitalizeFirstLetter(spacing)}`] : '']:
      !!spacing,
    [weight ? styles[`weight${capitalizeFirstLetter(weight)}`] : '']: !!weight,
    [styles.hasIcon]: !!icon,
  })

  if (textPlacement === 'left') {
    return (
      <span className={textIconClasses}>
        {children && <span className={styles.text}>{children}</span>}

        {icon}
      </span>
    )
  }

  return (
    <span className={textIconClasses}>
      {icon}

      {children && <span className={styles.text}>{children}</span>}
    </span>
  )
}
