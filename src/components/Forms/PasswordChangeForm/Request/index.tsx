import { useFormik } from 'formik'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  PageHeader,
  SendCodeButton,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import { TEXT } from '~/common/enums'
import {
  filterFormErrors,
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail
} from '~/common/utils'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'

interface FormProps {
  defaultEmail: string
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  submitCallback?: (params: any) => void
  closeDialog?: () => void
}

interface FormValues {
  email: string
  code: string
}

export const PasswordChangeRequestForm: React.FC<FormProps> = ({
  defaultEmail = '',
  type,
  purpose,
  submitCallback,
  closeDialog
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const { lang } = useContext(LanguageContext)

  const isForget = type === 'forget'
  const isInPage = purpose === 'page'
  const formId = 'password-change-request-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid
  } = useFormik<FormValues>({
    initialValues: {
      email: defaultEmail,
      code: ''
    },
    validate: ({ email, code }) =>
      filterFormErrors({
        email: validateEmail(email, lang, { allowPlusSign: true }),
        code: validateCode(code, lang)
      }),
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'password_reset', code } }
        })
        const confirmVerificationCode = data?.confirmVerificationCode

        if (submitCallback && confirmVerificationCode) {
          submitCallback({ email, codeId: confirmVerificationCode })
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach(c => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c])
          } else {
            setFieldError('email', messages[c])
          }
        })
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
        required
        placeholder={
          isForget
            ? translate({
                zh_hant: TEXT.zh_hant.enterRegisteredEmail,
                zh_hans: TEXT.zh_hans.enterRegisteredEmail,
                lang
              })
            : translate({
                zh_hant: TEXT.zh_hant.enterEmail,
                zh_hans: TEXT.zh_hans.enterEmail,
                lang
              })
        }
        value={values.email}
        error={touched.email && errors.email}
        disabled={!!defaultEmail}
        onBlur={handleBlur}
        onChange={handleChange}
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
        required
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
          <SendCodeButton
            email={values.email}
            type="password_reset"
            disabled={!!errors.email}
          />
        }
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={
        <Translate
          zh_hant={TEXT.zh_hant.nextStep}
          zh_hans={TEXT.zh_hans.nextStep}
        />
      }
      loading={isSubmitting}
    />
  )

  const Title = isForget ? (
    <Translate
      zh_hant={TEXT.zh_hant.resetPassword}
      zh_hans={TEXT.zh_hans.resetPassword}
    />
  ) : (
    <Translate
      zh_hant={TEXT.zh_hant.changePassword}
      zh_hans={TEXT.zh_hans.changePassword}
    />
  )

  if (isInPage) {
    return (
      <>
        <PageHeader title={Title} hasNoBorder>
          {SubmitButton}
        </PageHeader>

        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title={Title}
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}
