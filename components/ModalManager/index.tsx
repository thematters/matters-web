import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { Modal } from '~/components'

const emptyModalId = ''

const ModalContext = React.createContext({
  openedModalId: emptyModalId,
  open: (modalId: string) => {
    // Do nothing
  },
  close: () => {
    // Do nothing
  }
})

/**
 * Context provider for global modal management.
 *
 * Usage:
 *
 * ```jsx
 *   <ModalProdiver defaultModalId={optional}>
 *     <App />
 *   </ModalProdiver>
 * ```
 *
 */
export const ModalProvider = ({
  children,
  defaultModalId = emptyModalId
}: {
  children: ReactNode
  defaultModalId?: string
}) => {
  const [openedModalId, setOpenedModalId] = useState(defaultModalId)

  const open = (id: string) => {
    setOpenedModalId(id)
  }

  const close = () => {
    setOpenedModalId(defaultModalId)
  }

  return (
    <ModalContext.Provider
      value={{
        openedModalId,
        open: (modalId: string) => open(modalId),
        close: () => close()
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

/**
 * Context consumer for activating modal.
 *
 * Usage:
 *
 * ```jsx
 *   <ModalSwitch modalId="loginModal">
 *     {(open) => <Button onClick={open} />}
 *   </ModalSwitch>
 * ```
 *
 */
export const ModalSwitch = ({
  children,
  modalId
}: {
  children: any
  modalId: string
}) => (
  <ModalContext.Consumer>
    {({ open }) => children(() => open(modalId))}
  </ModalContext.Consumer>
)

/**
 * Context consumer for hosting modal instance.
 *
 * Usage:
 *
 * ```jsx
 *  <ModalInstance modalId="loginModal" title="title">
 *    {({ close, interpret }) => <LoginModal />}
 *  </ModalInstance>
 * ```
 *
 */
const defaultAnchorNode = 'modal-anchor'

export const ModalInstance = ({
  children,
  defaultCloseOnEsc,
  defaultCloseOnOutsideClick,
  enableCloseButton,
  modalId,
  title
}: {
  children: any
  defaultCloseOnEsc?: boolean
  defaultCloseOnOutsideClick?: boolean
  enableCloseButton?: boolean
  modalId: string
  title?: string
}) => {
  const [node, setNode] = useState<Element | null>(null)

  useEffect(() => {
    if (document) {
      setNode(document.getElementById(defaultAnchorNode))
    }
  })

  return (
    <ModalContext.Consumer>
      {({ close, openedModalId }) => {
        if (children && node && openedModalId === modalId) {
          return ReactDOM.createPortal(
            <Modal.Container
              title={title}
              close={close}
              defaultCloseOnEsc={defaultCloseOnEsc}
              defaultCloseOnOutsideClick={defaultCloseOnOutsideClick}
              enableCloseButton={enableCloseButton}
            >
              {(props: any) => <>{children(props)}</>}
            </Modal.Container>,
            node
          )
        }
        return null
      }}
    </ModalContext.Consumer>
  )
}
