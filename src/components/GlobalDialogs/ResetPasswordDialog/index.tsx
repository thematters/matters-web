import { useContext, useState } from 'react'

import {
  ChangePasswordForm,
  Dialog,
  useEventListener,
  useStep,
  ViewerContext,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_RESET_PASSWORD_DIALOG } from '~/common/enums'

const ResetPasswordDialog = () => {
  const viewer = useContext(ViewerContext)

  // data & controls
  const { currStep, goForward } = useStep('request')
  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: viewer.info.email,
    codeId: '',
  })
  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData({ ...data, email, codeId })
    goForward('reset')
  }

  // dailog & global listeners
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    goForward('request')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  useEventListener(CLOSE_ACTIVE_DIALOG, close)
  useEventListener(OPEN_RESET_PASSWORD_DIALOG, open)

  return (
    <Dialog
      isOpen={showDialog}
      onDismiss={close}
      size={currStep === 'complete' ? 'sm' : 'lg'}
      fixedHeight={currStep !== 'complete'}
    >
      {currStep === 'request' && (
        <ChangePasswordForm.Request
          defaultEmail={data.email}
          type="forget"
          purpose="dialog"
          submitCallback={requestCodeCallback}
          closeDialog={close}
        />
      )}

      {currStep === 'reset' && (
        <ChangePasswordForm.Confirm
          codeId={data.codeId}
          submitCallback={() => goForward('complete')}
          type="forget"
          purpose="dialog"
          closeDialog={close}
        />
      )}

      {currStep === 'complete' && (
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
