// import { useFormik } from 'formik'
// import _pickBy from 'lodash/pickBy'
// import Link from 'next/link'
// import { useContext } from 'react'

import {
  Dialog,
  Form,
  // LanguageContext,
  LanguageSwitch,
  Layout,
  // ReCaptchaContext,
  Translate,
  // useMutation,
} from '~/components'

// import SEND_CODE from '~/components/GQL/mutations/sendCode'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_LOGIN_DIALOG,
  OPEN_WALLET_SIGNUP_DIALOG,
} from '~/common/enums'
// import {
// appendTarget,
// parseFormSubmitErrors,
// translate,
// validateDisplayName,
// validateEmail,
// validateToS,
// } from '~/common/utils'

import styles from './styles.css'

// import { SendVerificationCode } from '~/components/GQL/mutations/__generated__/SendVerificationCode'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  closeDialog?: () => void
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  // const { lang } = useContext(LanguageContext)
  // const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'login-sign-up-init-form'

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      <label>
        <Translate zh_hant="選擇管道" zh_hans="選擇管道" en="Connect Method" />
      </label>
      <Form.List spacing="xloose">
        <Form.List.Item
          title={
            <Translate
              zh_hant="連接加密錢包"
              zh_hans="連接加密錢包"
              en="connect CryptoWallet?"
            />
          }
          // rightText={<Translate id="login" />}
          // rightTextColor="green"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(
              new CustomEvent(OPEN_WALLET_SIGNUP_DIALOG, {
                detail: { initStep: 'init' },
              })
            )

            submitCallback?.()
          }}
        />
        <Form.List.Item
          title={
            <Translate
              zh_hant="透過電子郵箱密碼"
              zh_hans="透過電子郵箱密碼"
              en="with Email/Password?"
            />
          }
          // rightText={<Translate id="login" />}
          // rightTextColor="green"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
          }}
        />
      </Form.List>
      <style jsx>{`
        label {
          margin: var(--spacing-base);
        }
      `}</style>
    </Form>
  )

  /* const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      // disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      // loading={isSubmitting}
    />
  ) */

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={
            <>
              <Layout.Header.Title id="loginSignUp" />
              {/* SubmitButton */}
            </>
          }
        />

        {InnerForm}

        <footer>
          <LanguageSwitch />
          <style jsx>{styles}</style>
        </footer>
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="loginSignUp"
          closeDialog={closeDialog}
          // rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Init
