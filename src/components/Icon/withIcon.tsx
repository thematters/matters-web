import classNames from 'classnames'

import styles from './styles.css'

export type IconSize =
  | 'xs'
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
) => (props: IconProps) => {
  const { size = '', color = '', className, ...restProps } = props
  const iconClasses = classNames({
    icon: true,
    [size]: !!size,
    [color]: !!color,
    [className]: !!className,
  })

  return (
    <>
      <WrappedIcon className={iconClasses} aria-hidden="true" {...restProps} />

      <style jsx global>
        {styles}
      </style>
    </>
  )
}
