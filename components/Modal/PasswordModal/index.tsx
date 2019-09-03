import { FC, useContext, useState } from 'react'

import {
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components/Form/PasswordChangeForm'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import ModalComplete from '~/components/Modal/Complete'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

/**
 * This component is for password reset modal.
 *
 * Usage:
 *
 * ```jsx
 *   <PasswordModal purpose={'forget'} close={close} />
 * ```
 *
 */

const PasswordModal: FC<
  ModalInstanceProps & { purpose: 'forget' | 'change' }
> = ({ purpose }) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

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

  const backPreviousStep = (event: any) => {
    setStep('request')
  }

  return (
    <>
      <Modal.Header title={data[step].title} />

      {step === 'request' && (
        <PasswordChangeRequestForm
          defaultEmail={data.request.email}
          purpose={purpose}
          container="modal"
          submitCallback={requestCodeCallback}
        />
      )}
      {step === 'reset' && (
        <PasswordChangeConfirmForm
          codeId={data.request.codeId}
          container="modal"
          backPreviousStep={backPreviousStep}
          submitCallback={() => setStep('complete')}
        />
      )}
      {step === 'complete' && (
        <ModalComplete
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
    </>
  )
}

export default PasswordModal
