import { FC, useContext, useState } from 'react'

import {
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components/Form/PasswordChangeForm'
import { LanguageContext } from '~/components/Language'
import ModalComplete from '~/components/Modal/Complete'
import ModalContent from '~/components/Modal/Content'
import ModalHeader from '~/components/Modal/Header'

import { translate } from '~/common/utils'

/**
 * This component is for password reset modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.PasswordModal purpose={'forget'} close={close} />
 * ```
 *
 */

const PasswordModal: FC<
  ModalInstanceProps & { purpose: 'forget' | 'change' }
> = ({ purpose }) => {
  const { lang } = useContext(LanguageContext)

  const [step, setStep] = useState('request')

  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      title:
        purpose === 'forget'
          ? translate({ zh_hant: '忘記密碼', zh_hans: '忘记密码', lang })
          : translate({ zh_hant: '修改密碼', zh_hans: '修改密码', lang }),
      prev: 'login',
      next: 'reset'
    },
    reset: {
      title:
        purpose === 'forget'
          ? translate({ zh_hant: '重置密碼', zh_hans: '重置密码', lang })
          : translate({ zh_hant: '修改密碼', zh_hans: '修改密码', lang }),
      prev: 'request',
      next: 'complete'
    },
    complete: {
      title:
        purpose === 'forget'
          ? translate({
              zh_hant: '密碼重置成功',
              zh_hans: '密码重置成功',
              lang
            })
          : translate({
              zh_hant: '密碼修改成功',
              zh_hans: '密码修改成功',
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
    event.stopPropagation()
    setStep('request')
  }

  return (
    <>
      <ModalHeader title={data[step].title} />

      <ModalContent>
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
              purpose === 'forget'
                ? translate({
                    zh_hant: '密碼重置成功',
                    zh_hans: '密码重置成功',
                    lang
                  })
                : translate({
                    zh_hant: '密碼修改成功',
                    zh_hans: '密码修改成功',
                    lang
                  })
            }
            hint={
              purpose === 'forget'
                ? translate({
                    zh_hant: '請使用新的密碼重新登入',
                    zh_hans: '请使用新的密码重新登入',
                    lang
                  })
                : ''
            }
          />
        )}
      </ModalContent>
    </>
  )
}

export default PasswordModal
