import { useFormik } from 'formik'
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

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'

interface FormProps {
  defaultEmail: string
  submitCallback?: (codeId: string) => void
  closeDialog: () => void
}

interface FormValues {
  email: string
  code: string
}

const Request: React.FC<FormProps> = ({
  defaultEmail = '',
  submitCallback,
  closeDialog
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const { lang } = useContext(LanguageContext)
  const formId = 'change-email-request-form'

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
      email: defaultEmail,
      code: ''
    },
    validate: ({ email, code }) => {
      const isInvalidEmail = validateEmail(email, lang, { allowPlusSign: true })
      const isInvalidCode = validateCode(code, lang)
      return {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCode ? { code: isInvalidCode } : {})
      }
    },
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset', code } }
        })
        const confirmVerificationCode = data?.confirmVerificationCode

        if (submitCallback && confirmVerificationCode) {
          submitCallback(confirmVerificationCode)
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

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.email}
            zh_hans={TEXT.zh_hans.email}
          />
        }
        type="email"
        name="email"
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled
      />

      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.verificationCode}
            zh_hans={TEXT.zh_hans.verificationCode}
          />
        }
        type="text"
        name="code"
        autoComplete="off"
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterVerificationCode,
          zh_hans: TEXT.zh_hans.enterVerificationCode,
          lang
        })}
        value={values.code}
        error={touched.code && errors.code}
        onBlur={handleBlur}
        onChange={handleChange}
        extraButton={
          <SendCodeButton email={values.email} lang={lang} type="email_reset" />
        }
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!_isEmpty(errors) || isSubmitting}
      text={
        <Translate
          zh_hant={TEXT.zh_hant.nextStep}
          zh_hans={TEXT.zh_hans.nextStep}
        />
      }
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant={TEXT.zh_hant.changeEmail}
            zh_hans={TEXT.zh_hans.changeEmail}
          />
        }
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]}>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Request
