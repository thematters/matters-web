import { IconProps, withIcon, WrappedIcon } from './withIcon'

/**
 * Icon component that render as `<svg>`
 *
 * Usage:
 *
 * ```tsx
 * import { Icon, withIcon } from '~/components'
 * import IconLike from '@/public/static/icons/like.svg'
 *
 * <Icon icon={IconLike} size={24} />
 *
 * // or
 * <>{withIcon(IconLike)({ size: 24 })}</>
 * ```
 */

export const Icon = ({
  icon,
  ...restProps
}: IconProps & { icon: WrappedIcon }) => {
  return <>{withIcon(icon)(restProps)}</>
}

export * from './withIcon'
