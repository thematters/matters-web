import { useContext, useState } from 'react'

import {
  ChangePasswordForm,
  Dialog,
  useEventListener,
  ViewerContext,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_RESET_PASSWORD_DIALOG } from '~/common/enums'

const ResetPasswordDialog = () => {
  const viewer = useContext(ViewerContext)

  // data & controls
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: viewer.info.email,
    codeId: '',
  })
  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData({ ...data, email, codeId })
    setStep('reset')
  }

  // dailog & global listeners
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
      size={step === 'complete' ? 'sm' : 'lg'}
      fixedHeight={step !== 'complete'}
    >
      {step === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.email}
          type="forget"
          purpose="dialog"
          submitCallback={requestCodeCallback}
          closeDialog={close}
        />
      )}

      {step === 'reset' && (
        <ChangePasswordForm.Confirm
          codeId={data.codeId}
          submitCallback={() => setStep('complete')}
          type="forget"
          purpose="dialog"
          closeDialog={close}
        />
      )}

      {step === 'complete' && (
        <ChangePasswordForm.Complete
          type="forget"
          purpose="dialog"
          closeDialog={close}
        />
      )}
    </Dialog>
  )
}

export default ResetPasswordDialog
