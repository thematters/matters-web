import { useContext, useState } from 'react'

import LoginForm from '~/components/Form/LoginForm'
import OnboardingInfoModal from '~/components/Modal/OnboardingInfoModal'
import PasswordModal from '~/components/Modal/PasswordModal'
import SignUpModal from '~/components/Modal/SignUpModal'
import TermModal from '~/components/Modal/TermModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'
import SetupLikeCoin from '~/components/SetupLikeCoin'
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

const OpenedModal = ({ modalId }: { modalId: string }) => (
  <ModalSwitch modalId={modalId}>{(open: any) => open()}</ModalSwitch>
)

const Anchor = () => {
  const [isLikeCoinClosed, setIsLikeCoinClosed] = useState(false)
  const viewer = useContext(ViewerContext)
  const disagreedToS = !!viewer.info && viewer.info.agreeOn === null

  return (
    <>
      <div id="modal-anchor" className="container" />

      <ModalInstance modalId="loginModal" title="login">
        {(props: ModalInstanceProps) => (
          <LoginForm purpose="modal" {...props} />
        )}
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
        modalId="setupLikerIdModal"
        title="setupLikeCoin"
        onClose={() => {
          setIsLikeCoinClosed(true)
        }}
      >
        {(props: ModalInstanceProps) => <SetupLikeCoin />}
      </ModalInstance>

      {viewer.isAuthed && disagreedToS && <OpenedModal modalId="termModal" />}
      {!isLikeCoinClosed && viewer.isAuthed && !viewer.likerId && (
        <OpenedModal modalId="setupLikerIdModal" />
      )}
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
