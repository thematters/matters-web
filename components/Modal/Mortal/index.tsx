// External modules
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { Portal as ReactPortal } from 'react-portal'

// Internal modules
import { KEYCODES } from '~/common/enums'
import { useNativeEventListener } from '~/components/Hook'
import styles from './styles.css'

/**
 * This component is built on top of Portal, and it's for injecting modal
 * instances to the where <Modal.Anchor> locates with overlay. Default aligment
 * would be center.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.Mortal closeOnEsc closeOnOutsideClick>
 *     {({ opne, close, active, portal }) => (
 *       <>
 *         <button onClick={open}>Open Modal</button>
 *         {portal(<div>Contents of your modal</div>)}
 *       </>
 *     )}
 *   </Modal.Mortal>
 * ```
 *
 */

interface Props {
  alignment?: 'center' | 'bottom'
  closeOnEsc?: boolean
  closeOnOutsideClick?: boolean
  children: any
  defaultActive?: boolean
}

const Mortal: FC<Props> = ({
  alignment = 'center',
  closeOnEsc = false,
  closeOnOutsideClick = false,
  children,
  defaultActive = false
}) => {
  const defaultNode = 'modal-anchor'

  const [node, setNode] = useState(undefined)

  const [portalNode, setPortalNode] = useState(undefined)

  const [active, setActive] = useState(defaultActive)

  const open = (event: any) => {
    if (active) {
      return undefined
    }
    if (event && event.nativeEvent) {
      event.nativeEvent.stopImmediatePropagation()
    }
    window.dispatchEvent(new CustomEvent('openModal', {}))
    setActive(true)
  }

  const close = () => {
    if (!active) {
      return undefined
    }
    window.dispatchEvent(new CustomEvent('closeModal', {}))
    setActive(false)
  }

  const wrapPortal = (component: any) => {
    if (!active) {
      return null
    }

    // TODO: Add styles for bottom alignment
    const overlayClass = classNames('overlay', alignment)

    const modalClass = classNames(
      'l-col-4',
      'l-col-sm-6',
      'l-offset-sm-1',
      'l-col-md-4',
      'l-offset-md-2',
      'l-col-lg-4',
      'l-offset-lg-4'
    )

    return (
      <>
        <ReactPortal key="react-portal" node={node}>
          <div className={overlayClass}>
            <div ref={setPortalNode} className={modalClass}>
              {component}
            </div>
          </div>
        </ReactPortal>
        <style jsx>{styles}</style>
      </>
    )
  }

  const handleOnEsc = (event: any) => {
    if (!closeOnEsc) {
      return undefined
    }
    if (event.keyCode !== KEYCODES.escape) {
      return undefined
    }
    close()
  }

  const handleOnOutsideClick = (event: any) => {
    if (!closeOnOutsideClick || !active) {
      return undefined
    }
    const root = portalNode
    if (
      !root ||
      root.contains(event.target) ||
      (event.button && event.button !== 0)
    ) {
      return undefined
    }
    close()
  }

  useNativeEventListener('keydown', handleOnEsc, active)

  useNativeEventListener('click', handleOnOutsideClick, active)

  useEffect(() => {
    if (document) {
      setNode(document.getElementById(defaultNode))
    }
    if (active) {
      disableBodyScroll(portalNode)
    }
    return () => {
      enableBodyScroll(portalNode)
    }
  })

  return children({ open, close, portal: wrapPortal, active })
}

export default Mortal
