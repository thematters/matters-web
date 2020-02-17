import { useState } from 'react'

import {
  Dialog,
  SignUpComplete,
  SignUpInitForm,
  SignUpProfileForm,
  Translate,
  useEventListener
} from '~/components'
import SetupLikeCoin from '~/components/SetupLikeCoin'

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_SIGNUP_DIALOG,
  TEXT
} from '~/common/enums'
import { analytics } from '~/common/utils'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

const SignUpDialog = () => {
  const [step, setStep] = useState<Step>('signUp')
  const data = {
    signUp: {
      title: (
        <Translate
          zh_hant={TEXT.zh_hant.register}
          zh_hans={TEXT.zh_hans.register}
        />
      )
    },
    profile: {
      title: (
        <Translate
          zh_hant={TEXT.zh_hant.userProfile}
          zh_hans={TEXT.zh_hans.userProfile}
        />
      )
    },
    setupLikeCoin: {
      title: (
        <Translate
          zh_hant={TEXT.zh_hant.setupLikeCoin}
          zh_hans={TEXT.zh_hans.setupLikeCoin}
        />
      )
    },
    complete: {
      title: (
        <Translate
          zh_hant={TEXT.zh_hant.registerSuccess}
          zh_hans={TEXT.zh_hans.registerSuccess}
        />
      )
    }
  }

  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setStep('signUp')
    setShowDialog(true)
  }
  const close = () => {
    setShowDialog(false)
    analytics.trackEvent(ANALYTICS_EVENTS.CLOSE_SIGNUP_MODAL)
  }
  const showHeader = step !== 'complete'

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_SIGNUP_DIALOG, open)

  return (
    <Dialog
      title={data[step].title}
      showHeader={showHeader}
      isOpen={showDialog}
      onDismiss={close}
    >
      {step === 'signUp' && (
        <SignUpInitForm
          purpose="dialog"
          submitCallback={() => {
            setStep('profile')
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, {
              step
            })
          }}
        />
      )}
      {step === 'profile' && (
        <SignUpProfileForm
          submitCallback={() => {
            setStep('setupLikeCoin')
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, {
              step
            })
          }}
        />
      )}
      {step === 'setupLikeCoin' && (
        <SetupLikeCoin
          submitCallback={() => {
            setStep('complete')
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, {
              step
            })
          }}
        />
      )}
      {step === 'complete' && <SignUpComplete />}
    </Dialog>
  )
}

export default SignUpDialog
