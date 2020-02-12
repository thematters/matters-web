import { useContext, useState } from 'react'

import {
  Dialog,
  EmailChangeConfirmForm,
  EmailChangeRequestForm,
  Translate,
  ViewerContext
} from '~/components'

import { TEXT } from '~/common/enums'

interface ChangeEmailDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

type Step = 'request' | 'confirm' | 'complete'

export const ChangeEmailDialog = ({ children }: ChangeEmailDialogProps) => {
  const viewer = useContext(ViewerContext)
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const [step, setStep] = useState<Step>('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'confirm',
      email: viewer.info.email
    },
    confirm: {
      next: 'complete'
    }
  })

  const requestCallback = (params: any) => {
    const { codeId } = params
    setData(prev => {
      return {
        ...prev,
        request: {
          ...prev.request,
          codeId
        }
      }
    })
    setStep('confirm')
  }

  const confirmCallback = () => setStep('complete')

  return (
    <>
      {children({ open })}

      <Dialog
        title={
          <Translate
            zh_hant={TEXT.zh_hant.changeEmail}
            zh_hans={TEXT.zh_hans.changeEmail}
          />
        }
        isOpen={showDialog}
        onDismiss={close}
      >
        {step === 'request' && (
          <EmailChangeRequestForm
            defaultEmail={data.request.email}
            submitCallback={requestCallback}
          />
        )}

        {step === 'confirm' && (
          <EmailChangeConfirmForm
            oldData={data.request}
            submitCallback={confirmCallback}
          />
        )}

        {step === 'complete' && (
          <Dialog.Message
            message={
              <Translate
                zh_hant={TEXT.zh_hant.changeEmailSuccess}
                zh_hans={TEXT.zh_hans.changeEmailSuccess}
              />
            }
          />
        )}
      </Dialog>
    </>
  )
}
