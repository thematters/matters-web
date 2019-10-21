import classNames from 'classnames'
import { FormikProps, withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import { Form } from '~/components/Form'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import { isValidPassword, translate } from '~/common/utils'

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

export const PasswordChangeConfirmForm: React.FC<FormProps> = formProps => {
  const [reset] = useMutation<ResetPassword>(RESET_PASSWORD)
  const { lang } = useContext(LanguageContext)
  const {
    codeId,
    extraClass = [],
    backPreviousStep,
    submitCallback,
    scrollLock
  } = formProps

  const validatePassword = (value: string) => {
    let result

    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidPassword(value)) {
      result = {
        zh_hant: TEXT.zh_hant.passwordHint,
        zh_hans: TEXT.zh_hans.passwordHint
      }
    }

    if (result) {
      return translate({ ...result, lang })
    }
  }

  const validateComparedPassword = (value: string, comparedValue: string) => {
    let result

    if (!comparedValue) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (comparedValue !== value) {
      result = {
        zh_hant: TEXT.zh_hant.passwordNotMatch,
        zh_hans: TEXT.zh_hans.passwordNotMatch
      }
    }

    if (result) {
      return translate({ ...result, lang })
    }
  }

  const InnerForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  }: FormikProps<FormValues>) => {
    const formClass = classNames('form', ...extraClass)
    const passwordPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterPassword,
      zh_hans: TEXT.zh_hans.enterPassword,
      lang
    })
    const passwordHint = translate({
      zh_hant: TEXT.zh_hant.passwordHint,
      zh_hans: TEXT.zh_hans.passwordHint,
      lang
    })
    const comparedPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterPasswordAgain,
      zh_hans: TEXT.zh_hans.enterPasswordAgain,
      lang
    })

    return (
      <form className={formClass} onSubmit={handleSubmit}>
        <Modal.Content scrollLock={scrollLock}>
          <Form.Input
            type="password"
            field="password"
            placeholder={passwordPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            hint={passwordHint}
          />
          <Form.Input
            type="password"
            field="comparedPassword"
            placeholder={comparedPlaceholder}
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
            <Translate
              zh_hant={TEXT.zh_hant.done}
              zh_hans={TEXT.zh_hans.done}
            />
          </Modal.FooterButton>
        </div>

        <style jsx>{styles}</style>
      </form>
    )
  }

  const MainForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({
      password: '',
      comparedPassword: ''
    }),

    validate: ({ password, comparedPassword }) => {
      const isInvalidPassword = validatePassword(password)
      const isInvalidComparedPassword = validateComparedPassword(
        password,
        comparedPassword
      )
      const errors = {
        ...(isInvalidPassword ? { password: isInvalidPassword } : {}),
        ...(isInvalidComparedPassword
          ? { comparedPassword: isInvalidComparedPassword }
          : {})
      }
      return errors
    },

    handleSubmit: async (values, { setFieldError, setSubmitting }) => {
      const { password } = values

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
  })(InnerForm)

  return <MainForm {...formProps} />
}
