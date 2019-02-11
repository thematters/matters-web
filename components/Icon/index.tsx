import classNames from 'classnames'

import styles from './styles.css'

type IconSizes = 'small' | 'default' | 'large'

type IconProps =
  | {
      size?: IconSizes
      id: string
      viewBox: string
      [key: string]: any
    }
  | {
      size?: IconSizes
      src: string
      [key: string]: any
    }

/**
 * Usage:
 *
 * ```jsx
 * import ICON_LOGO from '~/static/icons/logo.svg?sprite'
 *
 * // with "size"
 * <Icon id={ICON_LOGO.id} size="small" viewBox={ICON_LOGO.viewBox} />
 *
 * // with custom styles
 * <Icon id={ICON_LOGO.id} viewBox={ICON_LOGO.viewBox} style={{ width: 97, height: 20 }} />
 *
 * // with "src" (render as <img>)
 * import ICON_LOGO from '~/static/icons/logo.svg'
 * <Icon src={ICON_LOGO} style={{ width: 97, height: 20 }} />
 *
 * ```
 */

export const Icon: React.SFC<IconProps> = ({
  size = 'default',
  id,
  viewBox,
  src,
  className,
  ...restProps
}) => {
  const iconClass = classNames({
    [size]: true,
    [className]: !!className
  })

  // render as <img>
  if (src) {
    return (
      <>
        <img
          src={src}
          className={iconClass}
          aria-hidden="true"
          {...restProps}
        />
        <style jsx>{styles}</style>
      </>
    )
  }

  // redner as <svg>
  return (
    <>
      <svg
        viewBox={viewBox}
        className={iconClass}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...restProps}
      >
        <use xlinkHref={`#${id}`} />
      </svg>
      <style jsx>{styles}</style>
    </>
  )
}
