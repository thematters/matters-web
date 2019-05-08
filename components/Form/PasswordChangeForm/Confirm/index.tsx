import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { getErrorCodes, Mutation } from '~/components/GQL'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext } from '~/components/Language'

import { TEXT } from '~/common/enums'
import { isValidStrictPassword, translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  codeId: string
  extraClass?: string[]
  container: 'modal' | 'page'
  backPreviousStep: (event: any) => void
  submitCallback?: () => void
}

export const MUTATION_RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`

export const PasswordChangeConfirmForm: FC<Props> = ({
  codeId,
  extraClass = [],
  container,
  backPreviousStep,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const validatePassword = (value: string, language: string) => {
    let result: any

    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidStrictPassword(value)) {
      result = {
        zh_hant: TEXT.zh_hant.passwordHint,
        zh_hans: TEXT.zh_hans.passwordHint
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateComparedPassword = (
    value: string,
    comparedValue: string,
    language: string
  ) => {
    let result: any

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
      return translate({ ...result, lang: language })
    }
  }

  const BaseForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  }: {
    [key: string]: any
  }) => {
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
      <>
        <form className={formClass} onSubmit={handleSubmit}>
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
          <div className="buttons">
            <Button
              type="button"
              bgColor="transparent"
              className="u-link-green"
              spacing="none"
              onClick={backPreviousStep}
            >
              {translate({
                zh_hant: TEXT.zh_hant.previousStep,
                zh_hans: TEXT.zh_hans.previousStep,
                lang
              })}
            </Button>
            <Button
              type="submit"
              bgColor="green"
              style={{ minWidth: '5rem' }}
              disabled={isSubmitting}
              icon={isSubmitting ? <IconSpinner /> : null}
            >
              {translate({ zh_hant: '完成', zh_hans: '完成', lang })}
            </Button>
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      password: '',
      comparedPassword: ''
    }),

    validate: ({ password, comparedPassword }) => {
      const isInvalidPassword = validatePassword(password, lang)
      const isInvalidComparedPassword = validateComparedPassword(
        password,
        comparedPassword,
        lang
      )
      const errors = {
        ...(isInvalidPassword ? { password: isInvalidPassword } : {}),
        ...(isInvalidComparedPassword
          ? { comparedPassword: isInvalidComparedPassword }
          : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setFieldError, setSubmitting }: any) => {
      const { password } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }
      submitAction({ variables: { input: { password, codeId } } })
        .then(({ data }: any) => {
          const { resetPassword } = data
          if (submitCallback && resetPassword) {
            submitCallback()
          }
        })
        .catch((error: any) => {
          const errorCode = getErrorCodes(error)[0]
          const errorMessage = translate({
            zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
            zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
            lang
          })
          setFieldError('password', errorMessage)
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={MUTATION_RESET_PASSWORD}>
        {reset => <MainForm submitAction={reset} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
