import { useContext, useState } from 'react'

import {
  Dialog,
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm,
  Translate,
  ViewerContext
} from '~/components'

import { TEXT } from '~/common/enums'

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
      next: 'reset',
      email: viewer.info.email
    },
    reset: {
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
    setStep('reset')
  }

  const headerHidden = step === 'complete'
  const title = (
    <Translate
      zh_hant={TEXT.zh_hant.changePassword}
      zh_hans={TEXT.zh_hans.changePassword}
    />
  )

  return (
    <>
      {children && children({ open })}

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        size={headerHidden ? 'sm' : 'lg'}
      >
        {step === 'request' && (
          <PasswordChangeRequestForm
            defaultEmail={data.request.email}
            type="reset"
            purpose="dialog"
            submitCallback={requestCodeCallback}
            close={close}
          />
        )}

        {step === 'reset' && (
          <PasswordChangeConfirmForm
            codeId={data.request.codeId}
            type="reset"
            purpose="dialog"
            submitCallback={() => setStep('complete')}
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
                  zh_hant={TEXT.zh_hant.changePasswordSuccess}
                  zh_hans={TEXT.zh_hans.changePasswordSuccess}
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
    </>
  )
}
