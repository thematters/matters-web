import { useContext, useState } from 'react'

import {
  Dialog,
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm,
  Translate,
  useEventListener,
  ViewerContext
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_RESET_PASSWORD_DIALOG,
  TEXT
} from '~/common/enums'

const ResetPasswordDialog = () => {
  const viewer = useContext(ViewerContext)
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      prev: 'login',
      next: 'reset',
      email: viewer.info.email
    },
    reset: {
      prev: 'request',
      next: 'complete'
    },
    complete: {}
  })

  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData(prev => {
      return {
        ...prev,
        request: {
          ...prev.request,
          email,
          codeId
        }
      }
    })
    setStep('reset')
  }

  const backPreviousStep = () => {
    setStep('request')
  }

  const showHeader = step !== 'complete'

  const Title = (
    <Translate
      zh_hant={TEXT.zh_hant.resetPassword}
      zh_hans={TEXT.zh_hans.resetPassword}
    />
  )

  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setStep('request')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_RESET_PASSWORD_DIALOG, open)

  return (
    <Dialog
      title={Title}
      showHeader={showHeader}
      isOpen={showDialog}
      onDismiss={close}
      size={showHeader ? 'lg' : 'sm'}
    >
      {step === 'request' && (
        <PasswordChangeRequestForm
          defaultEmail={data.request.email}
          purpose="forget"
          submitCallback={requestCodeCallback}
        />
      )}

      {step === 'reset' && (
        <PasswordChangeConfirmForm
          codeId={data.request.codeId}
          backPreviousStep={backPreviousStep}
          submitCallback={() => setStep('complete')}
        />
      )}

      {step === 'complete' && (
        <>
          <Dialog.Message
            headline={Title}
            description={
              <Translate
                zh_hant={TEXT.zh_hant.resetPasswordSuccess}
                zh_hans={TEXT.zh_hans.resetPasswordSuccess}
              />
            }
          />
          <Dialog.Footer>
            <Dialog.Footer.Button
              bgColor="grey-lighter"
              textColor="black"
              onClick={close}
            >
              <Translate
                zh_hant={TEXT.zh_hant.cancel}
                zh_hans={TEXT.zh_hans.cancel}
              />
            </Dialog.Footer.Button>
          </Dialog.Footer>
        </>
      )}
    </Dialog>
  )
}

export default ResetPasswordDialog
