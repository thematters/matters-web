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
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setStep('request')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

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
  const showHeader = step !== 'complete'
  const Title = (
    <Translate
      zh_hant={TEXT.zh_hant.changeEmail}
      zh_hans={TEXT.zh_hans.changeEmail}
    />
  )

  return (
    <>
      {children({ open })}

      <Dialog
        title={Title}
        showHeader={showHeader}
        isOpen={showDialog}
        onDismiss={close}
        size={showHeader ? 'lg' : 'sm'}
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
          <>
            <Dialog.Message
              headline={Title}
              description={
                <Translate
                  zh_hant={TEXT.zh_hant.changeEmailSuccess}
                  zh_hans={TEXT.zh_hans.changeEmailSuccess}
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
    </>
  )
}
