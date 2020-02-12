import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  SendCodeButton,
  Translate
} from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import { TEXT } from '~/common/enums'
import { translate, validateCode, validateEmail } from '~/common/utils'

import styles from './styles.css'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { ChangeEmail } from './__generated__/ChangeEmail'

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

export const EmailChangeConfirmForm: React.FC<FormProps> = ({
  oldData,
  submitCallback
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const [changeEmail] = useMutation<ChangeEmail>(CHANGE_EMAIL)
  const { lang } = useContext(LanguageContext)
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      code: ''
    },
    validate: ({ email, code }) => {
      const isInvalidEmail = validateEmail(email, lang, {
        allowPlusSign: false
      })
      const isInvalidCode = validateCode(code, lang)
      return {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCode ? { code: isInvalidCode } : {})
      }
    },
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset_confirm', code } }
        })
        const confirmVerificationCode = data?.confirmVerificationCode
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

        if (errorCode.indexOf('CODE_') >= 0) {
          setFieldError('code', errorMessage)
        } else {
          setFieldError('email', errorMessage)
        }
      }

      setSubmitting(false)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Dialog.Content>
        <Form.Input
          type="email"
          field="email"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterNewEmail,
            zh_hans: TEXT.zh_hans.enterNewEmail,
            lang
          })}
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
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterVerificationCode,
            zh_hans: TEXT.zh_hans.enterVerificationCode,
            lang
          })}
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
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Button
          type="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate zh_hant={TEXT.zh_hant.done} zh_hans={TEXT.zh_hans.done} />
        </Dialog.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </form>
  )
}
