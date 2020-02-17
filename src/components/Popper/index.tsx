import dynamic from 'next/dynamic'

import { Z_INDEX } from '~/common/enums'

export type PopperInstance = import('tippy.js').Instance
export type PopperProps = import('@tippy.js/react').TippyProps

const DynamicTippy = dynamic(() => import('@tippy.js/react'), { ssr: true })

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
 *   <AppreciationButton />
 * <Tooltip>
 * ```
 *
 * @see {@url https://github.com/atomiks/tippy.js-react}
 */

export const Dropdown: React.FC<PopperProps> = props => (
  <DynamicTippy {...props} />
)
Dropdown.defaultProps = {
  arrow: false,
  trigger: 'click',
  interactive: true,
  aria: 'describedby',
  distance: 4,
  placement: 'bottom',
  // https://github.com/atomiks/tippyjs/blob/master/MIGRATION_GUIDE.md#if-you-were-using-interactive-true
  appendTo: typeof document !== 'undefined' ? document.body : undefined,
  animation: 'shift-away',
  theme: 'dropdown',
  boundary: 'window',
  zIndex: Z_INDEX.UNDER_GLOBAL_HEADER
}

export const Tooltip: React.FC<PopperProps> = props => (
  <DynamicTippy {...props} />
)
Tooltip.defaultProps = {
  arrow: true,
  interactive: false,
  distance: 12,
  placement: 'right',
  animation: 'shift-away',
  theme: 'tooltip',
  boundary: 'window',
  zIndex: Z_INDEX.UNDER_GLOBAL_HEADER
}

/**
 * Hide popper when inside button was clicked
 * @param instance
 */
export const hidePopperOnClick = (instance: PopperInstance) => {
  const popper = instance.popperChildren.tooltip

  popper.addEventListener('click', event => {
    const target = event.target as HTMLElement

    if (target?.closest && target.closest('[data-clickable], a, button')) {
      instance.hide()
    }
  })
}
