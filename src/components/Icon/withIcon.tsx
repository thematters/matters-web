import classNames from 'classnames'

import styles from './styles.module.css'

export type IconSize =
  | 12
  | 13
  | 14
  | 16
  | 18
  | 20
  | 22
  | 24
  | 26
  | 28
  | 30
  | 32
  | 35
  | 40
  | 48
  | 64
  | 88
  | 240

export type IconColor =
  | 'white'
  | 'whiteLight'
  | 'black'
  | 'greyDark'
  | 'greyDarker'
  | 'grey'
  | 'greyLight'
  | 'greyLighter'
  | 'green'
  | 'gold'
  | 'red'
  | 'redLight'
  | 'campaignBlue'
  | 'newPaletteSecondary700'

export interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
  /** Working Icon description */
  size?: IconSize
  /** Working Icon description */
  color?: IconColor
}

export type WrappedIcon = React.FunctionComponent<
  React.SVGProps<HTMLOrSVGElement>
>

export const withIcon = (WrappedIcon: WrappedIcon) => {
  const InnerIcon = (props: IconProps) => {
    const { size = '16', color = '', className, ...restProps } = props
    const iconClasses = classNames(
      {
        [styles.icon]: true,
        icon: true, // global selector
        [styles[`size${size}`]]: !!size,
        [styles[color]]: !!color,
      },
      className
    )

    return (
      <>
        <WrappedIcon
          className={iconClasses}
          aria-hidden="true"
          {...restProps}
        />
      </>
    )
  }

  return InnerIcon
}
