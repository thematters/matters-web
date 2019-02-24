// External modules
import React, { ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'

// Internal modules
import { Modal } from '~/components'

const emptyModalId = ''

const ModalContext = React.createContext({
  openedModalId: emptyModalId,
  previousModalId: emptyModalId,
  open: () => undefined,
  close: () => undefined
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
  const [previousModalId, setPreviousModalId] = useState(defaultModalId)

  const open = (id: string) => {
    setPreviousModalId(openedModalId)
    setOpenedModalId(id)
  }

  const close = (trace: boolean) => {
    if (trace) {
      setPreviousModalId(defaultModalId)
    }
    setOpenedModalId(defaultModalId)
  }

  return (
    <ModalContext.Provider
      value={{
        openedModalId,
        previousModalId,
        open: id => open(id),
        close: trace => close(trace)
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
  children: ReactNode
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
  modalId,
  title
}: {
  children: ReactNode
  modalId: string
  title?: string
}) => (
  <ModalContext.Consumer>
    {({ close, openedModalId }) => {
      if (openedModalId === modalId) {
        return ReactDOM.createPortal(
          <Modal.Container title={title} close={close}>
            {props => <>{children(props)}</>}
          </Modal.Container>,
          document.getElementById(defaultAnchorNode)
        )
      }
      return null
    }}
  </ModalContext.Consumer>
)
