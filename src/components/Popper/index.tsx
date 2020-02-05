import Tippy, { TippyProps } from '@tippy.js/react'
import { Instance } from 'tippy.js'

import { Z_INDEX_UNDER_GLOBAL_HEADER } from '~/common/enums'

export type PopperInstance = Instance

/**
 * Wrappers of <Tippy> with customize themes
 *
 * Usage:
 *
 * ```tsx
 * // <Dropdown> is usually used with <Menu>
 * <Dropdown content={<Menu><Menu.Item>發現</Menu.Item></Menu>}>
 *   <button type="button">menu</button>
 * <Dropdown>
 *
 * <Tooltip content="你最多可讚賞 5 次">
 *   <button type="button">讚賞</button>
 * <Tooltip>
 *
 * <Popover content={<Menu><Menu.Item>發現</Menu.Item></Menu>}>
 *   <button type="button">menu</button>
 * <Popover>
 * ```
 *
 * @see {@url https://github.com/atomiks/tippy.js-react}
 */

export const Dropdown: React.FC<TippyProps> = props => <Tippy {...props} />
Dropdown.defaultProps = {
  arrow: false,
  trigger: 'mouseenter focus click',
  interactive: true,
  aria: 'describedby',
  distance: 4,
  placement: 'bottom',
  // https://github.com/atomiks/tippyjs/blob/master/MIGRATION_GUIDE.md#if-you-were-using-interactive-true
  appendTo: typeof document !== 'undefined' ? document.body : undefined,
  animation: 'shift-away',
  theme: 'dropdown',
  boundary: 'window',
  zIndex: Z_INDEX_UNDER_GLOBAL_HEADER
}

export const Tooltip: React.FC<TippyProps> = props => <Tippy {...props} />
Tooltip.defaultProps = {
  arrow: true,
  interactive: false,
  distance: 12,
  placement: 'right',
  animation: 'shift-away',
  theme: 'tooltip',
  boundary: 'window',
  zIndex: Z_INDEX_UNDER_GLOBAL_HEADER
}

export const Popover: React.FC<TippyProps> = props => <Tippy {...props} />
Popover.defaultProps = {
  arrow: true,
  interactive: true,
  distance: 16,
  placement: 'right',
  animation: 'shift-away',
  theme: 'popover',
  boundary: 'window',
  zIndex: Z_INDEX_UNDER_GLOBAL_HEADER
}
