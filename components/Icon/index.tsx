type IconSizes = 'small' | 'default' | 'large'

interface IconProps {
  size?: IconSizes
  id: string
  viewBox: string
  [key: string]: any
}

const SizeMap: { [key in IconSizes]: { width: string; height: string } } = {
  small: { width: '1rem', height: '1rem' },
  default: { width: '1.5rem', height: '1.5rem' },
  large: { width: '2rem', height: '2rem' }
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
  ...restProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox={viewBox}
    {...SizeMap[size]}
    {...restProps}
  >
    <use xlinkHref={`#${id}`} />
  </svg>
)
