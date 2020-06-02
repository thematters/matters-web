import { Dialog, Translate } from '~/components'

import styles from './styles.css'

interface FormProps {
  switchToPrevious: () => void
  switchToResetPassword: () => void
}

const PasswordInvalid: React.FC<FormProps> = ({
  switchToPrevious,
  switchToResetPassword,
}) => {
  return (
    <>
      <Dialog.Message error={true} spacing="xxl">
        <h3>
          <Translate
            zh_hant="交易密碼錯誤，請重試"
            zh_hans="交易密码错误，请重试"
          />
        </h3>
      </Dialog.Message>

      <section className="password-invalid-footer">
        <Dialog.Footer>
          <Dialog.Footer.Button
            type="button"
            bgColor="green"
            onClick={switchToPrevious}
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
