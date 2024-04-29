import { IconProps, withIcon, WrappedIcon } from './withIcon'

/**
 * Icon component that render as `<svg>`
 *
 * Usage:
 *
 * ```tsx
 * import { Icon, withIcon } from '~/components'
 * import { ReactComponent as IconLike } from '@/public/static/icons/like.svg'
 *
 * <Icon icon={IconLike} size="md" />
 *
 * // or
 * <>{withIcon(IconLike)({ size: 'md' })}</>
 * ```
 */

export const Icon = ({
  icon,
  ...restProps
}: IconProps & { icon: WrappedIcon }) => {
  return <>{withIcon(icon)(restProps)}</>
}

export * from './withIcon'
