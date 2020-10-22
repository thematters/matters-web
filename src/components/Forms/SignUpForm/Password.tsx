import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { Dialog, Form, LanguageContext, Layout, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import {
  analytics,
  parseFormSubmitErrors,
  translate,
  validateComparedPassword,
  validatePassword,
} from '~/common/utils'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { UserRegister } from './__generated__/UserRegister'

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
  const [confirm] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const [register] = useMutation<UserRegister>(USER_REGISTER)
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = 'sign-up-password-form'

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
      password: '',
      comparedPassword: '',
    },
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
        await register({
          variables: {
            input: { email, codeId, displayName, password },
          },
        })

        analytics.identifyUser()

        setSubmitting(false)

        if (submitCallback) {
          submitCallback({ email, codeId, password })
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('password', messages[codes[0]])
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="password" />}
        type="password"
        name="password"
        required
        placeholder={translate({
          id: 'enterPassword',
          lang,
        })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        hint={<Translate id="hintPassword" />}
      />

      <Form.Input
        label={<Translate id="newPassword" />}
        type="password"
        name="comparedPassword"
        required
        placeholder={translate({ id: 'enterNewPasswordAgain', lang })}
        value={values.comparedPassword}
        error={touched.comparedPassword && errors.comparedPassword}
        hint={<Translate id="hintPassword" />}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="confirm" />}
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
          title="register"
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Password
