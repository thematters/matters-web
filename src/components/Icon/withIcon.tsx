import './styles.module.css'

import classNames from 'classnames'

export type IconSize =
  | 'xxs'
  | 'xs'
  | 'sm-s'
  | 'sm'
  | 'md-s'
  | 'md'
  | 'lg'
  | 'xl-m'
  | 'xl'
  | 'xxl'

export type IconColor =
  | 'white'
  | 'black'
  | 'grey-dark'
  | 'grey-darker'
  | 'grey'
  | 'grey-light'
  | 'grey-lighter'
  | 'green'
  | 'gold'
  | 'red'

export interface IconProps {
  /** Working Icon description */
  size?: IconSize
  /** Working Icon description */
  color?: IconColor
  [key: string]: any
}

export const withIcon = (
  WrappedIcon: React.FunctionComponent<React.SVGProps<HTMLOrSVGElement>>
) => {
  const InnerIcon = (props: IconProps) => {
    const { size = '', color = '', className, ...restProps } = props
    const iconClasses = classNames({
      icon: true,
      [size]: !!size,
      [color]: !!color,
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
