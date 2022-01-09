import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useMutation,
  VerificationSendCodeButton,
} from '~/components'
import { CHANGE_EMAIL } from '~/components/GQL/mutations/changeEmail'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import {
  parseFormSubmitErrors,
  translate,
  // validateDisplayName,
  validateCode,
  validateEmail,
  // validateToS,
} from '~/common/utils'
// import SEND_CODE from '~/components/GQL/mutations/sendCode'

interface FormValues {
  email: string
  code: string
}

interface FormProps {
  purpose: 'dialog' | 'page'
  // submitCallback: () => void
  submitCallback?: (codeId: string) => void
  closeDialog?: () => void
}

// import { SendVerificationCode } from '~/components/GQL/mutations/__generated__/SendVerificationCode'
import { ChangeEmail } from '~/components/GQL/mutations/__generated__/ChangeEmail'
import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'

const Verify: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const { lang } = useContext(LanguageContext)

  const formId = 'wallet-sign-up-verify-form'

  /* const [sendCode] = useMutation<SendVerificationCode>(SEND_CODE, undefined, {
    showToast: false,
  }) */
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)

  const [changeEmail] = useMutation<ChangeEmail>(CHANGE_EMAIL, undefined, {
    showToast: false,
  })

  const {
    account, // library
  } = useWeb3React<ethers.providers.Web3Provider>()

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
        // displayName: validateDisplayName(displayName, lang),
        email: validateEmail(email, lang, { allowPlusSign: false }),
        // tos: validateToS(tos, lang),
        code: validateCode(code, lang),
      }),
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        if (!account) {
          console.error('no account connected')
          return
        }

        const { data } = await confirmCode({
          variables: { input: { email, type: 'register', code } },
        })
        const confirmVerificationCode = data?.confirmVerificationCode

        // setSubmitting(false)

        if (submitCallback && confirmVerificationCode) {
          await changeEmail({
            variables: {
              input: {
                // oldEmail: oldData.email,
                // oldEmailCodeId: oldData.codeId,
                ethAddress: account,
                newEmail: email,
                newEmailCodeId: confirmVerificationCode,
              },
            },
          })
          submitCallback(confirmVerificationCode)
        }
      } catch (error) {
        // setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((c) => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c])
          } else {
            setFieldError('email', messages[c])
          }
        })
      } finally {
        setSubmitting(false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <div>
        <Translate
          zh_hant="所有重要訊息將通過郵件通知你。請注意，此郵箱將不作為登入管道使用。"
          zh_hans="所有重要訊息將通過郵件通知你。請注意，此郵箱將不作為登入管道使用。"
          en="for notification purpose only, this email is not to use as login"
        />
      </div>
      <Form.Input
        label={<Translate zh_hant="E-email" zh_hans="E-email" en="E-email" />}
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
            type="register"
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

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="register"
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Verify
