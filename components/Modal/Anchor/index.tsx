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

interface ModalInstanceProps {
  close: () => {}
  interpret: (text: string) => string
}

const Anchor = () => {
  return (
    <>
      <div>
        <div id="modal-anchor" className="container" />
        <ModalInstance modalId="loginModal" title="login">
          {(props: ModalInstanceProps) => <Modal.LoginModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="resetModal">
          {(props: ModalInstanceProps) => <Modal.ResetModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="termModal" title="term">
          {(props: ModalInstanceProps) => <Modal.TermModal {...props} />}
        </ModalInstance>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
