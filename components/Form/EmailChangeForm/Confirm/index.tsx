import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { FC, useContext } from 'react'

import { Form } from '~/components/Form'
import SendCodeButton from '~/components/Form/Button/SendCode'
import { getErrorCodes, Mutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import { isValidEmail, translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  oldData: { email: string; codeId: string }
  extraClass?: string[]
  submitCallback: () => void
}

const CONFIRM_CODE = gql`
  mutation ConfirmVerificationCode($input: ConfirmVerificationCodeInput!) {
    confirmVerificationCode(input: $input)
  }
`

const CHANGE_EMAIL = gql`
  mutation ChangeEmail($input: ChangeEmailInput!) {
    changeEmail(input: $input)
  }
`

const QUERY_VIEWER_EMAIL = gql`
  query ViewerEmail {
    viewer {
      id
      info {
        email
      }
    }
  }
`

export const EmailChangeConfirmForm: FC<Props> = ({
  oldData,
  extraClass = [],
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

    const emailPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterNewEmail,
      zh_hans: TEXT.zh_hans.enterNewEmail,
      lang
    })

    const codePlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterVerificationCode,
      zh_hans: TEXT.zh_hans.enterVerificationCode,
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <Modal.Content>
            <Form.Input
              type="email"
              field="email"
              placeholder={emailPlaceholder}
              values={values}
              errors={errors}
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
                  type="email_reset_confirm"
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
              htmlType="submit"
              disabled={!_isEmpty(errors) || isSubmitting}
              loading={isSubmitting}
              width="full"
            >
              <Translate
                zh_hant={TEXT.zh_hant.done}
                zh_hans={TEXT.zh_hans.done}
              />
            </Modal.FooterButton>
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      email: '',
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
      const { preSubmitAction, submitAction } = props
      if (!preSubmitAction || !submitAction) {
        return undefined
      }

      preSubmitAction({
        variables: { input: { email, type: 'email_reset_confirm', code } }
      })
        .then(({ data }: any) => {
          const { confirmVerificationCode } = data
          const params = {
            variables: {
              input: {
                oldEmail: oldData.email,
                oldEmailCodeId: oldData.codeId,
                newEmail: email,
                newEmailCodeId: confirmVerificationCode
              }
            }
          }
          return submitAction(params)
        })
        .then((result: any) => {
          if (submitCallback) {
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
          setFieldError('code', errorMessage)
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={CONFIRM_CODE}>
        {confirm => (
          <Mutation
            mutation={CHANGE_EMAIL}
            refetchQueries={[{ query: QUERY_VIEWER_EMAIL }]}
          >
            {update => (
              <MainForm preSubmitAction={confirm} submitAction={update} />
            )}
          </Mutation>
        )}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
