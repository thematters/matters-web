import dynamic from 'next/dynamic'
import { forwardRef, useEffect, useRef, useState } from 'react'
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
    openDialog: openDropdownOriginal,
    closeDialog: closeDropdown,
  } = useDialogSwitch(false)

  // 创建引用存储Tippy实例
  const tippyInstanceRef = useRef<any>(null)
  // 创建引用跟踪弹出元素
  const popperElementRef = useRef<HTMLElement | null>(null)
  // 为每个渲染设置唯一key，用于强制重新渲染
  const [renderKey, setRenderKey] = useState(0)

  // 完全重新定位下拉菜单
  const repositionDropdown = () => {
    if (!show || !tippyInstanceRef.current) return

    try {
      // 1. 获取Tippy实例和弹出元素
      const instance = tippyInstanceRef.current
      const popperElement = instance.popper

      if (!popperElement) return

      // 2. 临时隐藏弹出元素
      popperElement.style.visibility = 'hidden'

      // 3. 强制浏览器重排
      void popperElement.offsetHeight

      // 4. 如果存在popper实例，强制更新位置
      if (instance.popperInstance) {
        instance.popperInstance.update()
        // 使用setTimeout确保DOM更新后再次更新位置
        setTimeout(() => {
          if (instance.popperInstance) {
            instance.popperInstance.forceUpdate()
          }
          // 恢复可见性
          popperElement.style.visibility = 'visible'
        }, 0)
      } else {
        // 5. 如果没有popper实例，直接恢复可见性
        popperElement.style.visibility = 'visible'
      }
    } catch (e) {
      console.error('Failed to reposition dropdown:', e)
      // 出错时，强制重新渲染组件
      setRenderKey((prev) => prev + 1)
    }
  }

  // 打开下拉菜单的增强方法
  const openDropdown = () => {
    openDropdownOriginal()
    // 在下一个帧中强制定位
    requestAnimationFrame(() => {
      repositionDropdown()
    })
  }

  const toggle = () => (show ? closeDropdown() : openDropdown())

  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target?.closest && target.closest('[data-clickable], a, button')) {
      closeDropdown()
    }
    event.stopPropagation()
  }

  // 监听DOM元素大小变化
  useEffect(() => {
    if (!show) return

    // 使用ResizeObserver监听body大小变化
    const resizeObserver = new ResizeObserver(() => {
      repositionDropdown()
    })

    // 监听document.body大小变化
    if (typeof document !== 'undefined') {
      resizeObserver.observe(document.body)
    }

    // 监听弹出元素本身大小变化
    if (popperElementRef.current) {
      resizeObserver.observe(popperElementRef.current)
    }

    // 定期检查和更新位置（作为后备方案）
    const intervalId = setInterval(repositionDropdown, 500)

    return () => {
      resizeObserver.disconnect()
      clearInterval(intervalId)
    }
  }, [show])

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      repositionDropdown()
      // 如果重新定位失败，强制重新渲染
      setTimeout(() => {
        setRenderKey((prev) => prev + 1)
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize, true)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize, true)
    }
  }, [show])

  // 显示状态变化时重新定位
  useEffect(() => {
    if (show) {
      // 延迟执行以确保DOM已更新
      setTimeout(repositionDropdown, 0)
      setTimeout(repositionDropdown, 100)
    }
  }, [show])

  useNativeEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code?.toLowerCase() !== KEYVALUE.escape) {
      return
    }
    closeDropdown()
  })

  return (
    <DynamicLazyTippy
      key={renderKey}
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
      appendTo={typeof window !== 'undefined' ? document.body : 'parent'}
      aria={{ content: 'describedby', expanded: true }}
      popperOptions={{
        strategy: 'fixed',
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
              padding: 16,
              altAxis: true,
            },
          },
          {
            name: 'flip',
            options: {
              padding: 16,
              fallbackPlacements: ['top-end', 'bottom-start', 'top-start'],
            },
          },
        ],
      }}
      onCreate={(instance) => {
        tippyInstanceRef.current = instance
        if (instance.popper) {
          popperElementRef.current = instance.popper
        }
      }}
      onMount={(instance) => {
        if (instance.popper) {
          popperElementRef.current = instance.popper
        }
        repositionDropdown()
      }}
      onShow={(instance) => {
        if (instance.popper) {
          popperElementRef.current = instance.popper
        }
        repositionDropdown()
      }}
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
