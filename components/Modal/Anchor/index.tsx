import { useContext } from 'react'

import { Modal } from '~/components'
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

const Anchor = () => {
  const viewer = useContext(ViewerContext)

  const isAuth = !!viewer.id

  const disagreedToS = !!viewer.info && viewer.info.agreeOn === null

  const OpenedTermModal = () => (
    <ModalSwitch modalId="termModal">{(open: any) => open()}</ModalSwitch>
  )

  return (
    <>
      <div id="modal-anchor" className="container" />
      <ModalInstance modalId="loginModal" title="login">
        {(props: ModalInstanceProps) => <Modal.LoginModal {...props} />}
      </ModalInstance>
      <ModalInstance modalId="signUpModal">
        {(props: ModalInstanceProps) => <Modal.SignUpModal {...props} />}
      </ModalInstance>
      <ModalInstance modalId="passwordResetModal">
        {(props: ModalInstanceProps) => (
          <Modal.PasswordModal purpose="forget" {...props} />
        )}
      </ModalInstance>
      <ModalInstance modalId="termModal" title="term" defaultCloseable={false}>
        {(props: ModalInstanceProps) => <Modal.TermModal {...props} />}
      </ModalInstance>
      {isAuth && disagreedToS && <OpenedTermModal />}
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
