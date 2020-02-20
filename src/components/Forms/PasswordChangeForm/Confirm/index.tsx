import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import {
  translate,
  validateComparedPassword,
  validatePassword
} from '~/common/utils'

import { ResetPassword } from './__generated__/ResetPassword'

interface FormProps {
  codeId: string
  backPreviousStep: (event: any) => void
  submitCallback?: () => void
}

interface FormValues {
  password: string
  comparedPassword: string
}

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`

export const PasswordChangeConfirmForm: React.FC<FormProps> = ({
  codeId,
  backPreviousStep,
  submitCallback
}) => {
  const [reset] = useMutation<ResetPassword>(RESET_PASSWORD)
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
      password: '',
      comparedPassword: ''
    },
    validate: ({ password, comparedPassword }) => {
      const isInvalidPassword = validatePassword(password, lang)
      const isInvalidComparedPassword = validateComparedPassword(
        password,
        comparedPassword,
        lang
      )
      return {
        ...(isInvalidPassword ? { password: isInvalidPassword } : {}),
        ...(isInvalidComparedPassword
          ? { comparedPassword: isInvalidComparedPassword }
          : {})
      }
    },
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await reset({
          variables: { input: { password, codeId } }
        })
        const resetPassword = data?.resetPassword

        if (submitCallback && resetPassword) {
          submitCallback()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('password', errorMessage)
      }

      setSubmitting(false)
    }
  })

  return (
    <Dialog.Content spacing={[0, 0]}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label={
            <Translate
              zh_hant={TEXT.zh_hant.password}
              zh_hans={TEXT.zh_hans.password}
            />
          }
          type="password"
          name="password"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterPassword,
            zh_hans: TEXT.zh_hans.enterPassword,
            lang
          })}
          value={values.password}
          error={touched.password && errors.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Form.Input
          label={
            <Translate
              zh_hant={TEXT.zh_hant.newPassword}
              zh_hans={TEXT.zh_hans.newPassword}
            />
          }
          type="password"
          name="comparedPassword"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterPasswordAgain,
            zh_hans: TEXT.zh_hans.enterPasswordAgain,
            lang
          })}
          value={values.comparedPassword}
          error={touched.comparedPassword && errors.comparedPassword}
          hint={
            <Translate
              zh_hant={TEXT.zh_hant.passwordHint}
              zh_hans={TEXT.zh_hans.passwordHint}
            />
          }
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <Dialog.Footer>
          <Dialog.Footer.Button
            onClick={backPreviousStep}
            bgColor="grey-lighter"
            textColor="black"
          >
            <Translate
              zh_hant={TEXT.zh_hant.previousStep}
              zh_hans={TEXT.zh_hans.previousStep}
            />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            type="submit"
            disabled={!_isEmpty(errors) || isSubmitting}
            loading={isSubmitting}
          >
            <Translate
              zh_hant={TEXT.zh_hant.done}
              zh_hans={TEXT.zh_hans.done}
            />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Form>
    </Dialog.Content>
  )
}
