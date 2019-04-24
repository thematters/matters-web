import Tippy, { TippyProps } from '@tippy.js/react'
import { Instance } from 'tippy.js'

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
  trigger: 'mouseenter focus click',
  interactive: true,
  distance: 4,
  placement: 'bottom',
  animateFill: false,
  theme: 'dropdown',
  boundary: 'window',
  zIndex: 99 // zIndex of GlobalHeader is 100
}

export const Tooltip: React.FC<TippyProps> = props => <Tippy {...props} />
Tooltip.defaultProps = {
  arrow: true,
  interactive: false,
  distance: 12,
  placement: 'right',
  animateFill: false,
  theme: 'tooltip',
  boundary: 'window',
  zIndex: 99
}

export const Popover: React.FC<TippyProps> = props => <Tippy {...props} />
Popover.defaultProps = {
  arrow: true,
  interactive: true,
  distance: 16,
  placement: 'right',
  animateFill: false,
  theme: 'popover',
  boundary: 'window',
  zIndex: 99
}
