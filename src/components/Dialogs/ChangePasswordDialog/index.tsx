import { useContext, useState } from 'react'

import {
  Dialog,
  PasswordChangeComplete,
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm,
  ViewerContext
} from '~/components'

interface ChangePasswordDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const ChangePasswordDialog = ({
  children
}: ChangePasswordDialogProps) => {
  const viewer = useContext(ViewerContext)
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      prev: 'login',
      next: 'confirm',
      email: viewer.info.email
    },
    confirm: {
      prev: 'request',
      next: 'complete'
    },
    complete: {}
  })
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setStep('request')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

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
    setStep('confirm')
  }

  return (
    <>
      {children && children({ open })}

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        size={step === 'complete' ? 'sm' : 'lg'}
      >
        {step === 'request' && (
          <PasswordChangeRequestForm
            defaultEmail={data.request.email}
            type="change"
            purpose="dialog"
            submitCallback={requestCodeCallback}
            closeDialog={close}
          />
        )}

        {step === 'confirm' && (
          <PasswordChangeConfirmForm
            codeId={data.request.codeId}
            type="change"
            purpose="dialog"
            submitCallback={() => setStep('complete')}
            closeDialog={close}
          />
        )}

        {step === 'complete' && (
          <PasswordChangeComplete
            type="change"
            purpose="dialog"
            closeDialog={close}
          />
        )}
      </Dialog>
    </>
  )
}
