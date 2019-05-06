import { useContext } from 'react'

import LoginModal from '~/components/Modal/LoginModal'
import OnboardingInfoModal from '~/components/Modal/OnboardingInfoModal'
import PasswordModal from '~/components/Modal/PasswordModal'
import SelfActivationModal from '~/components/Modal/SelfActivationModal'
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

  const OpenedModal = ({ modalId }: { modalId: string }) => (
    <ModalSwitch modalId={modalId}>{(open: any) => open()}</ModalSwitch>
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
      <ModalInstance
        defaultCloseable={true}
        modalId="selfActivationModal"
        title="welcomeAuthor"
      >
        {(props: ModalInstanceProps) => <SelfActivationModal {...props} />}
      </ModalInstance>
      {viewer.isAuthed && disagreedToS && <OpenedModal modalId="termModal" />}
      {<OpenedModal modalId="selfActivationModal" />}
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
