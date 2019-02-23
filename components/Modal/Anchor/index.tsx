// Internal modules
import { Modal } from '~/components'
import { ModalInstance } from '~/components/ModalManager'
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
  return (
    <>
      <div>
        <div id="modal-anchor" className="container" />
        <ModalInstance modalId="loginModal" title="login">
          {props => <Modal.LoginModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="resetModal" defaultHeader={false}>
          {props => <Modal.ResetModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="termModal" title="term">
          {props => <Modal.TermModal {...props} />}
        </ModalInstance>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
