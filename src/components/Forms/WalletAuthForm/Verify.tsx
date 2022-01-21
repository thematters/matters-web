import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

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
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail,
} from '~/common/utils'

interface FormValues {
  email: string
  code: string
}

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: (codeId: string) => void
  closeDialog?: () => void
}

import { ChangeEmail } from '~/components/GQL/mutations/__generated__/ChangeEmail'
import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'

const Verify: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = 'wallet-auth-verify-form'

  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)

  const [changeEmail] = useMutation<ChangeEmail>(CHANGE_EMAIL, undefined, {
    showToast: false,
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      code: '',
    },
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

        if (submitCallback && confirmVerificationCode) {
          await changeEmail({
            variables: {
              input: {
                newEmail: email,
                newEmailCodeId: confirmVerificationCode,
              },
            },
          })
          submitCallback(confirmVerificationCode)
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((c) => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c])
          } else {
            setFieldError('email', messages[c])
          }
        })
      }
      setSubmitting(false)
    },
  })

  const Intro = () => {
    return (
      <Dialog.Message align="left">
        <p>
          <Translate
            zh_hant="未來所有重要訊息將透過郵件通知，填入電子信箱完成設定。提醒，電子信箱將不作為登入使用，僅作為聯繫渠道。另外，Matters 不會透過任何渠道主動詢問你的錢包私鑰。"
            zh_hans="未来所有重要讯息将透过邮件通知，填入电子信箱完成设定。提醒，电子信箱将不作为登入使用，仅作为联系渠道。另外，Matters 不会透过任何渠道主动询问你的钱包私钥。"
            en="未来所有重要讯息将透过邮件通知，填入电子信箱完成设定。提醒，电子信箱将不作为登入使用，仅作为联系渠道。另外，Matters 不会透过任何渠道主动询问你的钱包私钥。"
          />
        </p>
      </Dialog.Message>
    )
  }

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="email" />}
        type="email"
        name="email"
        required
        placeholder={translate({
          id: 'enterEmail',
          lang,
        })}
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
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          right={
            <>
              <Layout.Header.Title id="authEntries" />
              {SubmitButton}
            </>
          }
        />

        <Intro />

        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="authEntries"
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>
        <Intro />
        {InnerForm}
      </Dialog.Content>
    </>
  )
}

export default Verify
