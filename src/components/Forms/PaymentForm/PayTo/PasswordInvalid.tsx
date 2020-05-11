import { Dialog, Translate } from '~/components'

import styles from './styles.css'

interface FormProps {
  switchToConfirm: () => void
  switchToResetPassword: () => void
}

const PasswordInvalid: React.FC<FormProps> = ({
  switchToConfirm,
  switchToResetPassword,
}) => {
  return (
    <>
      <Dialog.Content hasGrow>
        <section className="password-invalid-message">
          <Translate
            zh_hant="支付密碼錯誤，請重試"
            zh_hans="支付密码错误，请重试"
          />
        </section>
      </Dialog.Content>

      <section className="password-invalid-footer">
        <Dialog.Footer>
          <Dialog.Footer.Button
            type="button"
            bgColor="green"
            onClick={switchToConfirm}
          >
            <Translate id="retry" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            type="button"
            bgColor="grey-lighter"
            textColor="black"
            onClick={switchToResetPassword}
          >
            <Translate id="forgetPassword" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

export default PasswordInvalid
