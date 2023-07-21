import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
} from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  setCookies,
  validateComparedPassword,
  validatePassword,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  useMutation,
} from '~/components'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import {
  ConfirmVerificationCodeMutation,
  UserRegisterMutation,
} from '~/gql/graphql'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface FormProps {
  email: string
  code: string
  displayName: string
  purpose: 'dialog' | 'page'
  submitCallback?: (params: any) => void
  closeDialog?: () => void
}

interface FormValues {
  password: string
  comparedPassword: string
}

const USER_REGISTER = gql`
  mutation UserRegister($input: UserRegisterInput!) {
    userRegister(input: $input) {
      auth
      token
      user {
        id
        settings {
          language
        }
        info {
          group
        }
      }
    }
  }
`

const Password: React.FC<FormProps> = ({
  purpose,
  email,
  code,
  displayName,
  submitCallback,
  closeDialog,
}) => {
  const [confirm] = useMutation<ConfirmVerificationCodeMutation>(
    CONFIRM_CODE,
    undefined,
    { showToast: false }
  )
  const [register] = useMutation<UserRegisterMutation>(
    USER_REGISTER,
    undefined,
    {
      showToast: false,
    }
  )
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = 'email-sign-up-password-form'

  const intl = useIntl()
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
      password: '',
      comparedPassword: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ password, comparedPassword }) =>
      _pickBy({
        password: validatePassword(password, lang),
        comparedPassword: validateComparedPassword(
          password,
          comparedPassword,
          lang
        ),
      }),
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        // verify email
        const { data } = await confirm({
          variables: { input: { email, code, type: 'register' } },
        })
        const codeId = data?.confirmVerificationCode

        // finish registration
        const { data: registerData } = await register({
          variables: { input: { email, codeId, displayName, password } },
        })

        const token = registerData?.userRegister.token || ''
        const language =
          registerData?.userRegister.user?.settings.language || ''
        const group = registerData?.userRegister.user?.info.group || ''
        setCookies({
          [COOKIE_LANGUAGE]: language,
          [COOKIE_USER_GROUP]: group,
          ...(isProd ? {} : { [COOKIE_TOKEN_NAME]: token }),
        })

        analytics.identifyUser()

        setSubmitting(false)

        if (submitCallback) {
          submitCallback({ email, codeId, password })
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('password', messages[codes[0]])
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<FormattedMessage defaultMessage="Password" />}
        type="password"
        name="password"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter Password',
        })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        hint={
          <FormattedMessage defaultMessage="Minimum 8 characters. Uppercase/lowercase letters, numbers and symbols are allowed" />
        }
      />

      <Form.Input
        label={
          <FormattedMessage
            defaultMessage="Enter password again"
            description="src/components/Forms/EmailSignUpForm/Password.tsx"
          />
        }
        type="password"
        name="comparedPassword"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter password again',
          description: 'src/components/Forms/EmailSignUpForm/Password.tsx',
        })}
        value={values.comparedPassword}
        error={touched.comparedPassword && errors.comparedPassword}
        hint={
          <FormattedMessage defaultMessage="Minimum 8 characters. Uppercase/lowercase letters, numbers and symbols are allowed" />
        }
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={
            <>
              <Layout.Header.Title id="register" />
              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting}
                text={<FormattedMessage defaultMessage="Confirm" />}
                loading={isSubmitting}
              />
            </>
          }
        />
        {InnerForm}
      </>
    )
  }

  return (
    <>
      <Dialog.Header
        title="register"
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default Password
