import { useContext, useState } from 'react'

import {
  Dialog,
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm,
  Translate,
  ViewerContext
} from '~/components'

import { TEXT } from '~/common/enums'

interface PasswordDialogProps {
  purpose: 'forget' | 'change'
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const PasswordDialog = ({ purpose, children }: PasswordDialogProps) => {
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
  const backPreviousStep = () => {
    setStep('request')
  }
  const showHeader = step !== 'complete'
  const Title =
    purpose === 'forget' ? (
      <Translate
        zh_hant={TEXT.zh_hant.resetPassword}
        zh_hans={TEXT.zh_hans.resetPassword}
      />
    ) : (
      <Translate
        zh_hant={TEXT.zh_hant.changePassword}
        zh_hans={TEXT.zh_hans.changePassword}
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
          <PasswordChangeRequestForm
            defaultEmail={data.request.email}
            purpose={purpose}
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
                purpose === 'forget' ? (
                  <Translate
                    zh_hant={TEXT.zh_hant.resetPasswordSuccess}
                    zh_hans={TEXT.zh_hans.resetPasswordSuccess}
                  />
                ) : (
                  <Translate
                    zh_hant={TEXT.zh_hant.changePasswordSuccess}
                    zh_hans={TEXT.zh_hans.changePasswordSuccess}
                  />
                )
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

export default PasswordDialog
