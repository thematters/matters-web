import { useContext } from 'react'

import LoginModal from '~/components/Modal/LoginModal'
import OnboardingInfoModal from '~/components/Modal/OnboardingInfoModal'
import PasswordModal from '~/components/Modal/PasswordModal'
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
 *   <Modal.Anchor />
 * ```
 *
 */

const Anchor = () => {
  const viewer = useContext(ViewerContext)
  const disagreedToS = !!viewer.info && viewer.info.agreeOn === null

  const OpenedTermModal = () => (
    <ModalSwitch modalId="termModal">{(open: any) => open()}</ModalSwitch>
  )

  return (
    <>
      <div id="modal-anchor" className="container" />
      <ModalInstance modalId="loginModal" title="login">
        {(props: ModalInstanceProps) => <LoginModal {...props} />}
      </ModalInstance>
      <ModalInstance modalId="signUpModal">
        {(props: ModalInstanceProps) => <SignUpModal {...props} />}
      </ModalInstance>
      <ModalInstance modalId="passwordResetModal">
        {(props: ModalInstanceProps) => (
          <PasswordModal purpose="forget" {...props} />
        )}
      </ModalInstance>
      <ModalInstance
        modalId="termModal"
        title="termAndPrivacy"
        defaultCloseable={false}
      >
        {(props: ModalInstanceProps) => <TermModal {...props} />}
      </ModalInstance>
      <ModalInstance modalId="onboardingInfoModal" title="onboardingInfo">
        {(props: ModalInstanceProps) => <OnboardingInfoModal {...props} />}
      </ModalInstance>
      {viewer.isAuthed && disagreedToS && <OpenedTermModal />}
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
