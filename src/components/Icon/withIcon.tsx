import classNames from 'classnames'

import styles from './styles.module.css'

export type IconSize =
  | 'xxs'
  | 'xs'
  | 'smS'
  | 'sm'
  | 'mdXS'
  | 'mdS'
  | 'mdM'
  | 'md'
  | 'lg'
  | 'xlM'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'xxxlM'

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

export interface IconProps {
  /** Working Icon description */
  size?: IconSize
  /** Working Icon description */
  color?: IconColor
  [key: string]: any
}

export type WrappedIcon = React.FunctionComponent<
  React.SVGProps<HTMLOrSVGElement>
>

export const withIcon = (WrappedIcon: WrappedIcon) => {
  const InnerIcon = (props: IconProps) => {
    const { size = '', color = '', className, ...restProps } = props
    const iconClasses = classNames({
      [styles.icon]: true,
      icon: true, // global selector
      [styles[size]]: !!size,
      [styles[color]]: !!color,
      [className]: !!className,
    })

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
