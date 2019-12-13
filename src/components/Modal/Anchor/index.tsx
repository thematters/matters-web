import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import LoginForm from '~/components/Form/LoginForm'
import LikeCoinTermModal from '~/components/Modal/LikeCoinTermModal'
import PasswordModal from '~/components/Modal/PasswordModal'
import SignUpModal from '~/components/Modal/SignUpModal'
import TermModal from '~/components/Modal/TermModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'
import SetupLikeCoin from '~/components/SetupLikeCoin'
import { ViewerContext } from '~/components/Viewer'

import { PATHS } from '~/common/enums'

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
  const router = useRouter()
  const viewer = useContext(ViewerContext)

  // ToS Modal
  const disagreedToS = !!viewer.info?.agreeOn === null

  // LikeCoin Modal
  const [isLikeCoinClosed, setIsLikeCoinClosed] = useState(false)
  const allowPaths = [
    PATHS.HOME.href,
    PATHS.MISC_ABOUT.href,
    PATHS.MISC_FAQ.href,
    PATHS.ME_SETTINGS_ACCOUNT.href,
    PATHS.ME_APPRECIATIONS_RECEIVED.href,
    PATHS.ME_APPRECIATIONS_SENT.href
  ]
  const isLikeCoinAllowPaths =
    router.pathname && allowPaths.indexOf(router.pathname) >= 0
  const shouldShowLikeCoinModal =
    viewer.isAuthed &&
    !isLikeCoinClosed &&
    isLikeCoinAllowPaths &&
    viewer.shouldSetupLikerID
  const closeLikeCoinModal = () => {
    setIsLikeCoinClosed(true)
  }

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

      <ModalInstance
        modalId="likeCoinTermModal"
        title="likeCoinTerm"
        onClose={closeLikeCoinModal}
      >
        {(props: ModalInstanceProps) => (
          <LikeCoinTermModal {...props} submitCallback={closeLikeCoinModal} />
        )}
      </ModalInstance>

      <ModalInstance modalId="setupLikerIdModal" title="setupLikeCoin">
        {(props: ModalInstanceProps) => <SetupLikeCoin />}
      </ModalInstance>

      {viewer.isAuthed && disagreedToS && <OpenedModal modalId="termModal" />}

      {shouldShowLikeCoinModal && <OpenedModal modalId="likeCoinTermModal" />}

      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
