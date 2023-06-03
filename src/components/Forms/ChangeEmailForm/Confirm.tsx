import { useFormik } from 'formik'
// import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useId } from 'react'

import {
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  Translate,
  useMutation,
  VerificationSendCodeButton,
} from '~/components'
import { CHANGE_EMAIL } from '~/components/GQL/mutations/changeEmail'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import {
  ChangeEmailMutation,
  ConfirmVerificationCodeMutation,
} from '~/gql/graphql'

import styles from '../styles.module.css'

interface FormProps {
  oldData: { email: string; codeId: string }
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
}

interface FormValues {
  email: string
  code: string
}

const Confirm: React.FC<FormProps> = ({
  oldData,
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCodeMutation>(
    CONFIRM_CODE,
    undefined,
    { showToast: false }
  )
  const [changeEmail] = useMutation<ChangeEmailMutation>(
    CHANGE_EMAIL,
    undefined,
    {
      showToast: false,
    }
  )
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'

  const formId = useId()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      code: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ email, code }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: false }),
        code: validateCode(code, lang),
      }),
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset_confirm', code } },
        })
        const confirmVerificationCode = data?.confirmVerificationCode
        const params = {
          variables: {
            input: {
              oldEmail: oldData.email,
              oldEmailCodeId: oldData.codeId,
              newEmail: email,
              newEmailCodeId: confirmVerificationCode,
            },
          },
        }

        await changeEmail(params)

        setSubmitting(false)

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        codes.forEach((c) => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c])
          } else {
            setFieldError('email', messages[c])
          }
        })
      }
    },
  })

  const InnerForm = (
    <section className={styles['container']}>
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Input
          label={<Translate id="email" />}
          type="email"
          name="email"
          required
          placeholder={translate({ id: 'enterNewEmail', lang })}
          value={values.email}
          error={touched.email && errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <Form.Input
          label={<Translate id="verificationCode" />}
          type="text"
          name="code"
          required
          placeholder={translate({ id: 'enterVerificationCode', lang })}
          hint={translate({ id: 'hintVerificationCode', lang })}
          value={values.code}
          error={touched.code && errors.code}
          onBlur={handleBlur}
          onChange={handleChange}
          extraButton={
            <VerificationSendCodeButton
              email={values.email}
              type="email_reset_confirm"
              disabled={!!errors.email}
            />
          }
        />
      </Form>
    </section>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<Translate id="confirm" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.Title id="changeEmail" />}
          right={
            <>
              <span />
              {SubmitButton}
            </>
          }
        />

        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="changeEmail"
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Confirm
