import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { Button } from '~/components/Button'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'
import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'
import { Title } from '~/components/Title'

import { redirectToTarget, translate } from '~/common/utils'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg?sprite'

import styles from './styles.css'

type Step = 'signUp' | 'profile' | 'complete'

const SignUp = () => {
  const { lang } = useContext(LanguageContext)
  const [step, setStep] = useState<Step>('signUp')

  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'signUp' })
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
  const childClass = ['l-col-4', 'l-col-sm-6', 'l-col-md-6', 'l-col-lg-8']

  const signUpCallback = () => setStep('profile')
  const signUpProfileCallback = () => setStep('complete')

  const Complete = () => {
    const completeClass = classNames(...childClass, 'complete')

    const completeTitle = translate({
      zh_hant: '歡迎加入 Matters！',
      zh_hans: '欢迎加入 Matters！',
      lang
    })

    const completeMessage = translate({
      zh_hant: '恭喜！註冊完成，你可以瀏覽社區的所有內容了。',
      zh_hans: '恭喜！註冊完成，你可以瀏覽社區的所有內容了。',
      lang
    })

    const completeContent = translate({
      zh_hant:
        '目前 Matters 是一個邀請制社區，你的賬號需要激活才能擁有創作資格，你可以向你認識的 Matters 老用戶索取激活資格。',
      zh_hans:
        '目前 Matters 是一个邀请制社区，你的账号需要激活才能拥有创作资格，你可以向你认识的 Matters 老用户索取激活资格。',
      lang
    })

    const completeStart = translate({
      zh_hant: '進入社區',
      zh_hans: '进入社区',
      lang
    })

    return (
      <>
        <div className={completeClass}>
          <div className="image">
            <Icon
              id={ICON_AVATAR_GREEN.id}
              viewBox={ICON_AVATAR_GREEN.viewBox}
              style={{ width: 80, height: 80 }}
            />
          </div>
          <div className="content">
            <div className="title">
              <Title is="h1" type="modal">
                {completeTitle}
              </Title>
            </div>
            <p>{completeMessage}</p>
            <br />
            <p>{completeContent}</p>
          </div>
          <div className="buttons">
            <Button
              type="submit"
              bgColor="green"
              size="large"
              onClick={redirectToTarget}
            >
              {completeStart}
            </Button>
          </div>
        </div>
        <style jsx>{styles}</style>
      </>
    )
  }

  return (
    <>
      <main className="l-row row">
        <Head title={{ zh_hant: '註冊', zh_hans: '注册' }} />

        <article className={containerClass}>
          {step === 'signUp' && (
            <SignUpInitForm
              extraClass={childClass}
              purpose="page"
              submitCallback={signUpCallback}
            />
          )}
          {step === 'profile' && (
            <SignUpProfileForm
              extraClass={childClass}
              purpose="page"
              submitCallback={signUpProfileCallback}
            />
          )}
          {step === 'complete' && <Complete />}
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default SignUp
