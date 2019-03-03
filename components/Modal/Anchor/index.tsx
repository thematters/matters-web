import { useContext } from 'react'

import { Modal } from '~/components/Modal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'
import { ViewerContext } from '~/components/Viewer'

import styles from './styles.css'

/**
 * This component is for hosting modal instances. We use react-portal to
 * inject modal into targeted node.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.Anchor />
 * ```
 *
 */

interface ModalInstanceProps {
  close: () => {}
  setCloseOnEsc: (value: boolean) => {}
  setCloseOnOutsideClick: (value: boolean) => {}
}

const Anchor = () => {
  const viewer = useContext(ViewerContext)

  const isAuth = !!viewer.id

  const disagreedToS = !!viewer.info && viewer.info.agreeOn === null

  const OpenedTermModal = () => (
    <ModalSwitch modalId="termModal">{(open: any) => open()}</ModalSwitch>
  )

  return (
    <>
      <div>
        <div id="modal-anchor" className="container" />
        <ModalInstance modalId="loginModal" title="login">
          {(props: ModalInstanceProps) => <Modal.LoginModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="signUpModal">
          {(props: ModalInstanceProps) => <Modal.SignUpModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="resetModal">
          {(props: ModalInstanceProps) => <Modal.ResetModal {...props} />}
        </ModalInstance>
        <ModalInstance
          modalId="termModal"
          title="term"
          defaultCloseOnEsc={false}
          defaultCloseOnOutsideClick={false}
          enableCloseButton={false}
        >
          {(props: ModalInstanceProps) => <Modal.TermModal {...props} />}
        </ModalInstance>
        {isAuth && disagreedToS && <OpenedTermModal />}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
