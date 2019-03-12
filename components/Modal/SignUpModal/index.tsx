import { FC, useContext, useState } from 'react'

import { Button } from '~/components/Button'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { Icon } from '~/components/Icon'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { ModalSwitch } from '~/components/ModalManager'
import { TextIcon } from '~/components/TextIcon'
import { Title } from '~/components/Title'

import { redirectToTarget, translate } from '~/common/utils'
import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg?sprite'

import styles from './styles.css'

/**
 * This component is for sign up modal.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpModal close={close} />
 * ```
 *
 */

type Step = 'signUp' | 'profile' | 'complete'

const LoginModalSwitch = () => (
  <ModalSwitch modalId="loginModal">
    {(open: any) => (
      <button type="button" onClick={open}>
        <TextIcon
          icon={
            <Icon
              style={{ width: 16, hieght: 10 }}
              id={ICON_ARROW.id}
              viewBox={ICON_ARROW.viewBox}
            />
          }
          color="green"
          size="md"
          textPlacement="left"
        >
          <Translate zh_hant="登入" zh_hans="登入" />
        </TextIcon>
      </button>
    )}
  </ModalSwitch>
)

const Footer = () => (
  <footer>
    <Translate zh_hant="已有帳號？" zh_hans="已有帐号？" />
    <LoginModalSwitch />
    <style jsx>{styles}</style>
  </footer>
)

const Complete = () => {
  return (
    <div className="complete">
      <div className="image">
        <Icon
          id={ICON_AVATAR_GREEN.id}
          viewBox={ICON_AVATAR_GREEN.viewBox}
          style={{ width: '5rem', height: '5rem' }}
        />
      </div>
      <div className="content">
        <div className="title">
          <Title is="h1" type="modal">
            <Translate
              zh_hant="歡迎加入 Matters！"
              zh_hans="欢迎加入 Matters！"
            />
          </Title>
        </div>
        <p>
          <Translate
            zh_hant="恭喜！註冊完成，你可以瀏覽社區的所有內容了。"
            zh_hans="恭喜！註冊完成，你可以瀏覽社區的所有內容了。"
          />
        </p>
        <br />
        <p>
          <Translate
            zh_hant="目前 Matters 是一個邀請制社區，你的賬號需要激活才能擁有創作資格，你可以向你認識的 Matters 老用戶索取激活資格。"
            zh_hans="目前 Matters 是一个邀请制社区，你的账号需要激活才能拥有创作资格，你可以向你认识的 Matters 老用户索取激活资格。"
          />
        </p>
      </div>
      <div className="buttons">
        <Button
          type="submit"
          bgColor="green"
          size="large"
          onClick={redirectToTarget}
        >
          <Translate zh_hant="進入社區" zh_hans="进入社区" />
        </Button>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

const SignUpModal: FC<ModalInstanceProps> = ({ closeable, setCloseable }) => {
  const { lang } = useContext(LanguageContext)

  const [step, setStep] = useState<Step>('signUp')

  const data: { [key: string]: any } = {
    signUp: {
      title: translate({ zh_hant: '註冊', zh_hans: '注册', lang })
    },
    profile: {
      title: translate({ zh_hant: '個人資料', zh_hans: '个人資料', lang })
    },
    complete: {
      title: translate({ zh_hant: '註冊成功', zh_hans: '註冊成功', lang })
    }
  }

  const signUpCallback = () => {
    setCloseable(false)
    setStep('profile')
  }

  const signUpProfileCallback = () => setStep('complete')

  return (
    <>
      <Modal.Header title={data[step].title} closeable={closeable} />

      <Modal.Content>
        {step === 'signUp' && (
          <>
            <SignUpInitForm purpose="modal" submitCallback={signUpCallback} />
            <Footer />
          </>
        )}
        {step === 'profile' && (
          <SignUpProfileForm
            purpose="modal"
            submitCallback={signUpProfileCallback}
          />
        )}
        {step === 'complete' && <Complete />}
      </Modal.Content>

      <style jsx>{styles}</style>
    </>
  )
}

export default SignUpModal
