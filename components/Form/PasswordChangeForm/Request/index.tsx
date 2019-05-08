import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import SendCodeButton from '~/components/Form/Button/SendCode'
import { getErrorCodes, Mutation } from '~/components/GQL'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext } from '~/components/Language'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'
import { isValidEmail, translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  defaultEmail: string
  extraClass?: string[]
  container: 'modal' | 'page'
  purpose: 'forget' | 'change'
  submitCallback?: (params: any) => void
}

export const MUTATION_CONFIRM_CODE = gql`
  mutation ConfirmVerificationCode($input: ConfirmVerificationCodeInput!) {
    confirmVerificationCode(input: $input)
  }
`

export const PasswordChangeRequestForm: FC<Props> = ({
  defaultEmail = '',
  extraClass = [],
  container,
  purpose,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const validateEmail = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidEmail(value)) {
      result = {
        zh_hant: TEXT.zh_hant.invalidEmail,
        zh_hans: TEXT.zh_hans.invalidEmail
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateCode = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const LoginModalSwitch = () => (
    <ModalSwitch modalId="loginModal">
      {(open: any) => (
        <Button
          type="button"
          bgColor="transparent"
          className="u-link-green"
          spacing="none"
          onClick={open}
        >
          {translate({
            zh_hant: TEXT.zh_hant.previousStep,
            zh_hans: TEXT.zh_hans.previousStep,
            lang
          })}
        </Button>
      )}
    </ModalSwitch>
  )

  const BaseForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldError
  }: {
    [key: string]: any
  }) => {
    const formClass = classNames('form', ...extraClass)

    const emailPlaceholder =
      purpose === 'forget'
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

    const codePlaceholder = translate({
      zh_hant: '請輸入驗證碼',
      zh_hans: '请输入验证码',
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <Form.Input
            type="text"
            field="email"
            placeholder={emailPlaceholder}
            values={values}
            errors={errors}
            disabled={!!defaultEmail}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Form.Input
            type="text"
            field="code"
            placeholder={codePlaceholder}
            floatElement={
              <SendCodeButton
                email={values.email}
                lang={lang}
                type="password_reset"
              />
            }
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <div className="buttons">
            <Button
              type="submit"
              bgColor="green"
              style={{ minWidth: '5rem' }}
              disabled={isSubmitting}
              icon={isSubmitting ? <IconSpinner /> : null}
            >
              {translate({
                zh_hant: TEXT.zh_hant.nextStep,
                zh_hans: TEXT.zh_hans.nextStep,
                lang
              })}
            </Button>
            {container === 'modal' && purpose === 'forget' && (
              <LoginModalSwitch />
            )}
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      email: defaultEmail,
      code: ''
    }),

    validate: ({ email, code }) => {
      const isInvalidEmail = validateEmail(email, lang)
      const isInvalidCode = validateCode(code, lang)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCode ? { code: isInvalidCode } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setFieldError, setSubmitting }: any) => {
      const { email, code } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }

      submitAction({
        variables: { input: { email, type: 'password_reset', code } }
      })
        .then(({ data }: any) => {
          const { confirmVerificationCode } = data
          if (submitCallback && confirmVerificationCode) {
            submitCallback({ email, codeId: confirmVerificationCode })
          }
        })
        .catch((error: any) => {
          const errorCode = getErrorCodes(error)[0]
          const errorMessage = translate({
            zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
            zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
            lang
          })
          setFieldError('code', errorMessage)
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={MUTATION_CONFIRM_CODE}>
        {confirmCode => <MainForm submitAction={confirmCode} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
