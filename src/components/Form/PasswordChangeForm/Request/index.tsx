import classNames from 'classnames'
import { FormikProps, withFormik } from 'formik'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'
import { useMutation } from 'react-apollo'

import { Form } from '~/components/Form'
import SendCodeButton from '~/components/Form/Button/SendCode'
import { getErrorCodes } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import { isValidEmail, translate } from '~/common/utils'

import styles from './styles.css'

interface FormProps {
  defaultEmail: string
  extraClass?: string[]
  container: 'modal' | 'page'
  purpose: 'forget' | 'change'
  submitCallback?: (params: any) => void
  scrollLock?: boolean
}

interface FormValues {
  email: string
  code: string
}

export const PasswordChangeRequestForm: React.FC<FormProps> = formProps => {
  const [confirmCode] = useMutation(CONFIRM_CODE)
  const { lang } = useContext(LanguageContext)
  const {
    defaultEmail = '',
    extraClass = [],
    purpose,
    submitCallback,
    scrollLock
  } = formProps

  const validateEmail = (value: string) => {
    let result
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
      return translate({ ...result, lang })
    }
  }

  const validateCode = (value: string) => {
    let result
    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
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
    handleSubmit,
    setFieldError
  }: FormikProps<FormValues>) => {
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
      zh_hant: TEXT.zh_hant.enterVerificationCode,
      zh_hans: TEXT.zh_hans.enterVerificationCode,
      lang
    })

    return (
      <form className={formClass} onSubmit={handleSubmit}>
        <Modal.Content scrollLock={scrollLock}>
          <Form.Input
            type="email"
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
            autoComplete="off"
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
        </Modal.Content>

        <div className="buttons">
          <Modal.FooterButton
            width="full"
            htmlType="submit"
            disabled={!_isEmpty(errors) || isSubmitting}
            loading={isSubmitting}
          >
            <Translate
              zh_hant={TEXT.zh_hant.nextStep}
              zh_hans={TEXT.zh_hans.nextStep}
            />
          </Modal.FooterButton>
        </div>

        <style jsx>{styles}</style>
      </form>
    )
  }

  const MainForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({
      email: defaultEmail,
      code: ''
    }),

    validate: ({ email, code }) => {
      const isInvalidEmail = validateEmail(email)
      const isInvalidCode = validateCode(code)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCode ? { code: isInvalidCode } : {})
      }
      return errors
    },

    handleSubmit: async (values, { setFieldError, setSubmitting }) => {
      const { email, code } = values

      try {
        const {
          data: { confirmVerificationCode }
        } = await confirmCode({
          variables: { input: { email, type: 'password_reset', code } }
        })

        if (submitCallback && confirmVerificationCode) {
          submitCallback({ email, codeId: confirmVerificationCode })
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('code', errorMessage)
      }

      setSubmitting(false)
    }
  })(InnerForm)

  return <MainForm {...formProps} />
}
