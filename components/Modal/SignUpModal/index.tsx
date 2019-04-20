import { FC, useContext, useState } from 'react'

import SignUpComplete from '~/components/Form/SignUpComplete'
import { SignUpInitForm, SignUpProfileForm } from '~/components/Form/SignUpForm'
import { Icon } from '~/components/Icon'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { ModalSwitch } from '~/components/ModalManager'
import { TextIcon } from '~/components/TextIcon'

import { translate } from '~/common/utils'
import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'

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
      title: translate({ zh_hant: '註冊成功', zh_hans: '注册成功', lang })
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
        {step === 'complete' && <SignUpComplete />}
      </Modal.Content>

      <style jsx>{styles}</style>
    </>
  )
}

export default SignUpModal
