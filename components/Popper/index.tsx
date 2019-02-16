import Tippy, { TippyProps } from '@tippy.js/react'

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
 * checkout {@url https://github.com/atomiks/tippy.js-react} for more samples
 */

export const Dropdown: React.FC<TippyProps> = props => <Tippy {...props} />
Dropdown.defaultProps = {
  trigger: 'mouseenter focus click',
  // trigger: 'click',
  interactive: true,
  distance: 4,
  placement: 'bottom',
  animateFill: false,
  theme: 'dropdown'
}

export const Tooltip: React.FC<TippyProps> = props => <Tippy {...props} />
Tooltip.defaultProps = {
  arrow: true,
  interactive: false,
  distance: 8,
  placement: 'right',
  animateFill: false,
  theme: 'tooltip'
}

export const Popover: React.FC<TippyProps> = props => <Tippy {...props} />
Popover.defaultProps = {
  arrow: true,
  interactive: true,
  distance: 8,
  placement: 'right',
  animateFill: false,
  theme: 'popover'
}
