import { useContext, useState } from 'react'

import SignUpComplete from '~/components/Form/SignUpComplete'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { LanguageContext } from '~/components/Language'
import { Modal } from '~/components/Modal'
import SetupLikeCoin from '~/components/SetupLikeCoin'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, translate } from '~/common/utils'

/**
 * This component is for sign up modal.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpModal close={close} />
 * ```
 *
 */

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUpModal: React.FC<ModalInstanceProps> = ({
  closeable,
  setCloseable,
  close
}) => {
  const closeModal = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.CLOSE_SIGNUP_MODAL)
    close()
  }

  const { lang } = useContext(LanguageContext)

  const [step, setStep] = useState<Step>('signUp')
  const data = {
    signUp: {
      title: translate({
        zh_hant: TEXT.zh_hant.register,
        zh_hans: TEXT.zh_hans.register,
        lang
      })
    },
    profile: {
      title: translate({
        zh_hant: TEXT.zh_hant.userProfile,
        zh_hans: TEXT.zh_hans.userProfile,
        lang
      })
    },
    setupLikeCoin: {
      title: translate({
        zh_hant: TEXT.zh_hant.setupLikeCoin,
        zh_hans: TEXT.zh_hans.setupLikeCoin,
        lang
      })
    },
    complete: {
      title: translate({
        zh_hant: TEXT.zh_hant.registerSuccess,
        zh_hans: TEXT.zh_hans.registerSuccess,
        lang
      })
    }
  }

  return (
    <>
      <Modal.Header
        title={data[step].title}
        closeable={closeable}
        close={closeModal}
      />

      {step === 'signUp' && (
        <SignUpInitForm
          purpose="modal"
          submitCallback={() => {
            setCloseable(false)
            setStep('profile')
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, { step })
          }}
        />
      )}
      {step === 'profile' && (
        <SignUpProfileForm
          purpose="modal"
          submitCallback={() => {
            setStep('setupLikeCoin')
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, { step })
          }}
        />
      )}
      {step === 'setupLikeCoin' && (
        <SetupLikeCoin
          submitCallback={() => {
            setStep('complete')
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, { step })
          }}
        />
      )}
      {step === 'complete' && <SignUpComplete />}
    </>
  )
}

export default SignUpModal
