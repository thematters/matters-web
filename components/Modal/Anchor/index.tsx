import { useContext } from 'react'

import LoginModal from '~/components/Modal/LoginModal'
import ResetModal from '~/components/Modal/ResetModal'
import SignUpModal from '~/components/Modal/SignUpModal'
import TermModal from '~/components/Modal/TermModal'
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
 *   <ModalAnchor />
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
          {(props: ModalInstanceProps) => <LoginModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="signUpModal">
          {(props: ModalInstanceProps) => <SignUpModal {...props} />}
        </ModalInstance>
        <ModalInstance modalId="resetModal">
          {(props: ModalInstanceProps) => <ResetModal {...props} />}
        </ModalInstance>
        <ModalInstance
          modalId="termModal"
          title="term"
          defaultCloseOnEsc={false}
          defaultCloseOnOutsideClick={false}
          enableCloseButton={false}
        >
          {(props: ModalInstanceProps) => <TermModal {...props} />}
        </ModalInstance>
        {isAuth && disagreedToS && <OpenedTermModal />}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
