/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic'
import { forwardRef } from 'react'
import FocusLock from 'react-focus-lock'

import { KEYVALUE, Z_INDEX } from '~/common/enums'

import { useDialogSwitch, useNativeEventListener } from '../Hook'

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
  ...props
}) => {
  const {
    show,
    openDialog: openDropdown,
    closeDialog: closeDropdown,
  } = useDialogSwitch(false)
  const toggle = () => (show ? closeDropdown() : openDropdown())
  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target?.closest && target.closest('[data-clickable], a, button')) {
      closeDropdown()
    }
    event.stopPropagation()
  }

  useNativeEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code?.toLowerCase() !== KEYVALUE.escape) {
      return
    }
    closeDropdown()
  })

  return (
    <DynamicLazyTippy
      arrow={false}
      trigger={undefined}
      onHidden={closeDropdown}
      onClickOutside={closeDropdown}
      visible={show}
      interactive
      offset={[0, 4]}
      placement="bottom-end"
      animation="shift-away"
      theme="dropdown"
      zIndex={Z_INDEX.OVER_DIALOG}
      appendTo={typeof window !== 'undefined' ? document.body : undefined}
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

  box.addEventListener('click', (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    if (target?.closest && target.closest('[data-clickable], a, button')) {
      instance.hide()
    }
  })
}
