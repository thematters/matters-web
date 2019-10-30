import classNames from 'classnames'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import { Form } from '~/components/Form'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import {
  translate,
  validateComparedPassword,
  validatePassword
} from '~/common/utils'

import { ResetPassword } from './__generated__/ResetPassword'
import styles from './styles.css'

interface FormProps {
  codeId: string
  extraClass?: string[]
  container: 'modal' | 'page'
  backPreviousStep: (event: any) => void
  submitCallback?: () => void
  scrollLock?: boolean
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
  extraClass = [],
  backPreviousStep,
  submitCallback,
  scrollLock
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
        const resetPassword = data && data.resetPassword

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

  const formClass = classNames('form', ...extraClass)

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <Modal.Content scrollLock={scrollLock}>
        <Form.Input
          type="password"
          field="password"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterPassword,
            zh_hans: TEXT.zh_hans.enterPassword,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          hint={translate({
            zh_hant: TEXT.zh_hant.passwordHint,
            zh_hans: TEXT.zh_hans.passwordHint,
            lang
          })}
        />
        <Form.Input
          type="password"
          field="comparedPassword"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterPasswordAgain,
            zh_hans: TEXT.zh_hans.enterPasswordAgain,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Modal.Content>

      <div className="buttons">
        <Modal.FooterButton onClick={backPreviousStep} bgColor="white">
          <Translate
            zh_hant={TEXT.zh_hant.previousStep}
            zh_hans={TEXT.zh_hans.previousStep}
          />
        </Modal.FooterButton>
        <Modal.FooterButton
          htmlType="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate zh_hant={TEXT.zh_hant.done} zh_hans={TEXT.zh_hans.done} />
        </Modal.FooterButton>
      </div>

      <style jsx>{styles}</style>
    </form>
  )
}
