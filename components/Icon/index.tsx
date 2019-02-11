import classNames from 'classnames'

import styles from './styles.css'

type IconSizes = 'small' | 'default' | 'large'

interface IconProps {
  size?: IconSizes
  id: string
  viewBox: string
  [key: string]: any
}

/**
 * Usage:
 *
 * ```
 * import ICON_LOGO from '~/static/icons/logo.svg?sprite'
 *
 * // with custom width and height
 * <Icon id={ICON_LOGO.id} width="97px" height="20px" viewBox={ICON_LOGO.viewBox} />
 *
 * // use size
 * <Icon id={ICON_LOGO.id} size="small" viewBox={ICON_LOGO.viewBox} />
 * ```
 */
export const Icon: React.SFC<IconProps> = ({
  size = 'default',
  id,
  viewBox,
  className,
  ...restProps
}) => {
  const iconClass = classNames({
    [size]: true,
    [className]: !!className
  })

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        viewBox={viewBox}
        className={iconClass}
        {...restProps}
      >
        <use xlinkHref={`#${id}`} />
      </svg>
      <style jsx>{styles}</style>
    </>
  )
}
