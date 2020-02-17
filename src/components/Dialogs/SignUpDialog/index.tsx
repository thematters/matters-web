import { useState } from 'react'

import {
  Dialog,
  SignUpComplete,
  SignUpInitForm,
  SignUpProfileForm,
  Translate
} from '~/components'
import SetupLikeCoin from '~/components/SetupLikeCoin'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

interface SignUpDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const SignUpDialog = ({ children }: SignUpDialogProps) => {
  const [step, setStep] = useState<Step>('signUp')
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

  return (
    <>
      {children({ open })}

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
    </>
  )
}
