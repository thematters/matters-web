import classNames from 'classnames'
import { FC, useContext, useState } from 'react'

import { Form } from '~/components/Form'
import { LanguageContext } from '~/components/Language'
import ModalContent from '~/components/Modal/Content'
import ModalHeader from '~/components/Modal/Header'

import { translate } from '~/common/utils'

import styles from './styles.css'

/**
 * This component is for password reset modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.ResetModal close={close} />
 * ```
 *
 */

const ResetModal: FC<ModalInstanceProps> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const [step, setStep] = useState('request')

  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      title: translate({ zh_hant: '忘記密碼', zh_hans: '忘记密码', lang }),
      prev: 'login',
      next: 'reset'
    },
    reset: {
      title: translate({ zh_hant: '重置密碼', zh_hans: '重置密码', lang }),
      prev: 'request',
      next: 'complete'
    },
    complete: {
      title: translate({
        zh_hant: '密碼重置成功',
        zh_hans: '密码重置成功',
        lang
      })
    }
  })

  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

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

  const Complete = () => (
    <>
      <div className="complete">
        <div className="message">
          {translate({
            zh_hant: '密碼重置成功',
            zh_hans: '密码重置成功',
            lang
          })}
        </div>
        <div className="hint">
          {translate({
            zh_hant: '請使用新的密碼重新登入',
            zh_hans: '请使用新的密码重新登入',
            lang
          })}
          。
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <ModalHeader title={data[step].title} />

      <ModalContent>
        <div className={contentClass}>
          {step === 'request' && (
            <Form.ResetCodeForm
              defaultEmail={data.request.email}
              purpose="modal"
              submitCallback={requestCodeCallback}
            />
          )}
          {step === 'reset' && (
            <Form.ResetForm
              codeId={data.request.codeId}
              purpose="modal"
              backPreviousStep={backPreviousStep}
              submitCallback={() => setStep('complete')}
            />
          )}
          {step === 'complete' && <Complete />}
        </div>
      </ModalContent>

      <style jsx>{styles}</style>
    </>
  )
}

export default ResetModal
