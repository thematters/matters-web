import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { Title } from '~/components'
import {
  PasswordChangeConfirmForm,
  PasswordChangeRequestForm
} from '~/components/Form/PasswordChangeForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'
import { Translate } from '~/components/Language'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const Forget = () => {
  const [step, setStep] = useState('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'reset'
    },
    reset: {
      prev: 'request',
      next: 'complete'
    }
  })

  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'forgot' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const containerClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-offset-sm-1',
    'l-col-md-4',
    'l-offset-md-2',
    'l-col-lg-6',
    'l-offset-lg-3',
    'container'
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
    setStep('request')
  }

  return (
    <>
      <main className="l-row">
        <Head
          title={{
            zh_hant: TEXT.zh_hant.forgetPassword,
            zh_hans: TEXT.zh_hans.forgetPassword
          }}
        />

        <article className={containerClass}>
          {step === 'request' && (
            <PasswordChangeRequestForm
              defaultEmail={data.request.email}
              purpose="forget"
              container="page"
              submitCallback={requestCodeCallback}
              scrollLock={false}
            />
          )}
          {step === 'reset' && (
            <PasswordChangeConfirmForm
              codeId={data.request.codeId}
              container="page"
              backPreviousStep={backPreviousStep}
              submitCallback={() => setStep('complete')}
              scrollLock={false}
            />
          )}
          {step === 'complete' && (
            <div className="complete">
              <Title is="h3" type="modal-headline">
                <Translate
                  zh_hant={TEXT.zh_hant.resetPasswordSuccess}
                  zh_hans={TEXT.zh_hans.resetPasswordSuccess}
                />
              </Title>

              <p className="hint">
                <Translate
                  zh_hant={TEXT.zh_hant.useNewPassword}
                  zh_hans={TEXT.zh_hans.useNewPassword}
                />
                。
              </p>
            </div>
          )}
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default Forget
