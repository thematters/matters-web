import classNames from 'classnames'

import styles from './styles.css'

type IconSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge' | 'xxlarge'

interface IconBaseProps {
  size?: IconSize
  [key: string]: any
}

type SVGIconProps = {
  id: string
  viewBox: string
} & IconBaseProps

type ImgIconProps = {
  src: string
} & IconBaseProps

type IconProps = SVGIconProps | ImgIconProps

/**
 * `<Icon>` component that render as `<svg>` or `<img>`
 *
 * Usage:
 *
 * ```tsx
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
 * ```
 */

export const Icon: React.FC<IconProps> = ({
  size = 'default',
  id,
  viewBox,
  src,
  className,
  ...restProps
}) => {
  const iconClasses = classNames({
    [size]: true,
    [className]: !!className
  })

  // render as <img>
  if (src) {
    return (
      <>
        <img
          src={src}
          className={iconClasses}
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
        className={iconClasses}
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
