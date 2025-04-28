import _throttle from 'lodash/throttle'
import dynamic from 'next/dynamic'
import { forwardRef, useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'

import { BREAKPOINTS, KEYVALUE, Z_INDEX } from '~/common/enums'

import { useDialogSwitch, useMediaQuery, useNativeEventListener } from '../Hook'

export type PopperInstance = any
export type PopperProps = import('@tippyjs/react').TippyProps

const DynamicLazyTippy = dynamic(
  () => import('./LazyTippy').then((mod) => mod.LazyTippy),
  {
    ssr: true, // enable for first screen
  }
)

type ForwardChildrenNode = ({
  openDropdown,
  ref,
}: {
  openDropdown: () => void
  ref?: React.Ref<any>
}) => React.ReactNode

interface ForwardChildrenProps {
  openDropdown: () => void
  children: ForwardChildrenNode
}

const ForwardChildren = forwardRef(
  ({ openDropdown, children }: ForwardChildrenProps, ref) => (
    <>{children({ openDropdown, ref })}</>
  )
)

ForwardChildren.displayName = 'ForwardChildren'

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
type DropdownProps = Omit<PopperProps, 'children'> &
  Omit<ForwardChildrenProps, 'openDropdown'> & {
    focusLock?: boolean
  }

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  focusLock = true,
  appendTo = 'parent',
  ...props
}) => {
  const {
    show,
    openDialog: openDropdownOriginal,
    closeDialog: closeDropdown,
  } = useDialogSwitch(false)

  const [forceUpdateKey, setForceUpdateKey] = useState(0)
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.LG}px)`)

  const toggle = () => (show ? closeDropdown() : openDropdownOriginal())

  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target?.closest && target.closest('[data-clickable], a, button')) {
      closeDropdown()
    }
    event.stopPropagation()
  }

  // Listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      // THE KEY SOLUTION: Force complete re-rendering of the component after a short delay
      // This 20ms delay is crucial - it gives the browser time to complete layout calculations
      setTimeout(() => {
        setForceUpdateKey((prev) => prev + 1)
      }, 20)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [show])

  // Listen for scroll events on mobile only
  const handleScroll = _throttle(() => {
    if (show && isMobile) {
      closeDropdown()
    }
  }, 300)

  useNativeEventListener('scroll', handleScroll)

  useNativeEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code?.toLowerCase() !== KEYVALUE.escape) {
      return
    }
    closeDropdown()
  })

  return (
    <DynamicLazyTippy
      key={forceUpdateKey} // Use forceUpdateKey to force re-rendering
      arrow={false}
      trigger={undefined}
      onHidden={closeDropdown}
      onClickOutside={closeDropdown}
      visible={show}
      interactive
      appendTo={appendTo}
      offset={[0, 4]}
      placement="bottom-end"
      animation="shift-away"
      theme="dropdown"
      zIndex={Z_INDEX.OVER_DIALOG}
      aria={{ content: 'describedby', expanded: true }}
      {...props}
      content={
        <FocusLock disabled={!focusLock} autoFocus={false}>
          <div
            onKeyDown={(event) => {
              if (event.code.toLowerCase() !== KEYVALUE.enter) {
                return
              }
              closeOnClick(event)
            }}
            onClick={closeOnClick}
          >
            {props.content}
          </div>
        </FocusLock>
      }
    >
      <ForwardChildren openDropdown={toggle}>{children}</ForwardChildren>
    </DynamicLazyTippy>
  )
}

export const Tooltip: React.FC<PopperProps> = (props) => (
  <DynamicLazyTippy
    arrow
    interactive={false}
    offset={[0, 12]}
    placement="right"
    animation="shift-away"
    maxWidth="18.5rem"
    theme="tooltip"
    zIndex={Z_INDEX.UNDER_GLOBAL_HEADER}
    aria={{ content: 'describedby', expanded: true }}
    {...props}
  />
)

/**
 * Hide popper when inside button was clicked
 * @param instance
 */
export const hidePopperOnClick = (instance: PopperInstance) => {
  const box = instance.popper.firstElementChild

  if (!box) {
    return
  }

  box.addEventListener('click', (event: any) => {
    const target = event.target as HTMLElement

    if (target?.closest && target.closest('[data-clickable], a, button')) {
      instance.hide()
    }
  })
}
