import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { LanguageContext } from '~/components/Language'

import { isValidEmail, translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  oldData: { email: string; codeId: string }
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback: () => void
}

const MUTATION_CONFIRM_CODE = gql`
  mutation ConfirmVerificationCode($input: ConfirmVerificationCodeInput!) {
    confirmVerificationCode(input: $input)
  }
`

const MUTATION_CHANGE_EMAIL = gql`
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
  purpose,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const validateEmail = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidEmail(value)) {
      result = { zh_hant: '電子信箱格式有誤', zh_hans: '邮箱格式有误' }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateCode = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
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

    const emailPlaceholder = translate({
      zh_hant: '請輸入新電子信箱',
      zh_hans: '请输入新邮箱',
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
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Form.Input
            type="text"
            field="code"
            placeholder={codePlaceholder}
            style={{ marginTop: '0.6rem', paddingRight: '6rem' }}
            floatElement={
              <Form.SendCodeButton
                email={values.email}
                lang={lang}
                type="email_reset"
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
              style={{ width: 80 }}
              disabled={isSubmitting}
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

    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { email, code } = values
      const { preSubmitAction, submitAction } = props
      if (!preSubmitAction || !submitAction) {
        return undefined
      }

      preSubmitAction({
        variables: { input: { email, type: 'email_reset', code } }
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
        .catch((result: any) => {
          // TODO: Handle error
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={MUTATION_CONFIRM_CODE}>
        {confirm => (
          <Mutation
            mutation={MUTATION_CHANGE_EMAIL}
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
