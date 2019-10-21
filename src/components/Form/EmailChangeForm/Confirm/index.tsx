import { FormikProps, withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'
import { useMutation } from 'react-apollo'

import { Form } from '~/components/Form'
import SendCodeButton from '~/components/Form/Button/SendCode'
import { getErrorCodes } from '~/components/GQL'
import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import { isValidEmail, translate } from '~/common/utils'

import { ChangeEmail } from './__generated__/ChangeEmail'
import styles from './styles.css'

interface FormProps {
  oldData: { email: string; codeId: string }
  submitCallback: () => void
}

interface FormValues {
  email: string
  code: string
}

const CHANGE_EMAIL = gql`
  mutation ChangeEmail($input: ChangeEmailInput!) {
    changeEmail(input: $input) {
      id
      info {
        email
      }
    }
  }
`

const InnerForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldError
}: FormikProps<FormValues>) => {
  const { lang } = useContext(LanguageContext)
  const emailPlaceholder = translate({
    zh_hant: TEXT.zh_hant.enterNewEmail,
    zh_hans: TEXT.zh_hans.enterNewEmail,
    lang
  })
  const codePlaceholder = translate({
    zh_hant: TEXT.zh_hant.enterVerificationCode,
    zh_hans: TEXT.zh_hans.enterVerificationCode,
    lang
  })

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Content>
        <Form.Input
          type="email"
          field="email"
          placeholder={emailPlaceholder}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <Form.Input
          type="text"
          field="code"
          autoComplete="off"
          placeholder={codePlaceholder}
          floatElement={
            <SendCodeButton
              email={values.email}
              lang={lang}
              type="email_reset_confirm"
            />
          }
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Modal.Content>
      <div className="buttons">
        <Modal.FooterButton
          htmlType="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
          width="full"
        >
          <Translate zh_hant={TEXT.zh_hant.done} zh_hans={TEXT.zh_hans.done} />
        </Modal.FooterButton>
      </div>

      <style jsx>{styles}</style>
    </form>
  )
}

export const EmailChangeConfirmForm: React.FC<FormProps> = formProps => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const [changeEmail] = useMutation<ChangeEmail>(CHANGE_EMAIL)
  const { lang } = useContext(LanguageContext)
  const { oldData, submitCallback } = formProps

  const validateEmail = (value: string) => {
    let result

    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidEmail(value)) {
      result = {
        zh_hant: TEXT.zh_hant.invalidEmail,
        zh_hans: TEXT.zh_hans.invalidEmail
      }
    }

    if (result) {
      return translate({ ...result, lang })
    }
  }

  const validateCode = (value: string) => {
    let result

    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    }

    if (result) {
      return translate({ ...result, lang })
    }
  }

  const MainForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({
      email: '',
      code: ''
    }),

    validate: ({ email, code }) => {
      const isInvalidEmail = validateEmail(email)
      const isInvalidCode = validateCode(code)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCode ? { code: isInvalidCode } : {})
      }
      return errors
    },

    handleSubmit: async (values, { setFieldError, setSubmitting }) => {
      const { email, code } = values

      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset_confirm', code } }
        })
        const confirmVerificationCode = data && data.confirmVerificationCode
        const params = {
          variables: {
            input: {
              oldEmail: oldData.email,
              oldEmailCodeId: oldData.codeId,
              newEmail: email,
              newEmailCodeId: confirmVerificationCode
            }
          }
        }

        await changeEmail(params)

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('code', errorMessage)
      }

      setSubmitting(false)
    }
  })(InnerForm)

  return <MainForm {...formProps} />
}
