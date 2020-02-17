import { useContext, useState } from 'react'

import {
  Dialog,
  LanguageContext,
  SetupLikeCoin,
  SignUpComplete,
  SignUpInitForm,
  SignUpProfileForm
} from '~/components'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, translate } from '~/common/utils'

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete'

interface SignUpDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const SignUpDialog = ({ children }: SignUpDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => {
    setShowDialog(false)
    analytics.trackEvent(ANALYTICS_EVENTS.CLOSE_SIGNUP_MODAL)
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
      {children({ open })}

      <Dialog title={data[step].title} isOpen={showDialog} onDismiss={close}>
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
