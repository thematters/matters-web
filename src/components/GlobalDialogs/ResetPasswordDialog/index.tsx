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

  const headerHidden = step === 'complete'

  const title = (
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
      isOpen={showDialog}
      onDismiss={close}
      size={headerHidden ? 'sm' : 'lg'}
    >
      {step === 'request' && (
        <PasswordChangeRequestForm
          defaultEmail={data.request.email}
          type="forget"
          purpose="dialog"
          submitCallback={requestCodeCallback}
          close={close}
        />
      )}

      {step === 'reset' && (
        <PasswordChangeConfirmForm
          codeId={data.request.codeId}
          submitCallback={() => setStep('complete')}
          type="forget"
          purpose="dialog"
          close={close}
        />
      )}

      {step === 'complete' && (
        <>
          <Dialog.Header title={title} close={close} headerHidden />

          <Dialog.Message
            headline={title}
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
                zh_hant={TEXT.zh_hant.close}
                zh_hans={TEXT.zh_hans.close}
              />
            </Dialog.Footer.Button>
          </Dialog.Footer>
        </>
      )}
    </Dialog>
  )
}

export default ResetPasswordDialog
