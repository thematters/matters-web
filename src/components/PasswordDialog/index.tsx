import { useContext, useState } from 'react'

import { Dialog, LanguageContext, Translate } from '~/components'
import {
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components/Form/PasswordChangeForm'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

interface PasswordDialogProps {
  purpose: 'forget' | 'change'
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const PasswordDialog = ({ purpose, children }: PasswordDialogProps) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      title:
        purpose === 'forget'
          ? translate({
              zh_hant: TEXT.zh_hant.forgetPassword,
              zh_hans: TEXT.zh_hans.forgetPassword,
              lang
            })
          : translate({
              zh_hant: TEXT.zh_hant.changePassword,
              zh_hans: TEXT.zh_hans.changeEmail,
              lang
            }),
      prev: 'login',
      next: 'reset',
      email: viewer.info.email
    },
    reset: {
      title:
        purpose === 'forget'
          ? translate({
              zh_hant: TEXT.zh_hant.resetPassword,
              zh_hans: TEXT.zh_hans.resetPassword,
              lang
            })
          : translate({
              zh_hant: TEXT.zh_hant.changePassword,
              zh_hans: TEXT.zh_hans.changePassword,
              lang
            }),
      prev: 'request',
      next: 'complete'
    },
    complete: {
      title:
        purpose === 'forget'
          ? translate({
              zh_hant: TEXT.zh_hant.resetPasswordSuccess,
              zh_hans: TEXT.zh_hans.resetPasswordSuccess,
              lang
            })
          : translate({
              zh_hant: TEXT.zh_hant.changePasswordSuccess,
              zh_hans: TEXT.zh_hans.changePasswordSuccess,
              lang
            })
    }
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

  return (
    <>
      {children({ open })}

      <Dialog title={data[step].title} isOpen={showDialog} onDismiss={close}>
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
          <Dialog.Message
            message={
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
            hint={
              purpose === 'forget' ? (
                <Translate
                  zh_hant={TEXT.zh_hant.useNewPassword}
                  zh_hans={TEXT.zh_hans.useNewPassword}
                />
              ) : (
                ''
              )
            }
          />
        )}
      </Dialog>
    </>
  )
}

export default PasswordDialog
