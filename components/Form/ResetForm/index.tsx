import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { LanguageContext } from '~/components/Language'

import { isValidPassword, translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  codeId: string
  extraClass?: string[]
  purpose: 'modal' | 'page'
  backPreviousStep: (event: any) => void
  submitCallback?: () => void
}

export const MUTATION_RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`

const ResetForm: FC<Props> = ({
  codeId,
  extraClass = [],
  purpose,
  backPreviousStep,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const validatePassword = (value: string, language: string) => {
    let result: any

    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidPassword(value)) {
      result = {
        zh_hant: '不少於 8 位，必須包含數字和大小寫字母',
        zh_hans: '不少于 8 位，必须包含数字和大小写字母'
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
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (comparedValue !== value) {
      result = { zh_hant: '密碼不一致', zh_hans: '密码不一致' }
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
      zh_hant: '請輸入密碼',
      zh_hans: '请输入密码',
      lang
    })

    const comparedPlaceholder = translate({
      zh_hant: '請再次輸入密碼',
      zh_hans: '请再次输入密码',
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
          />
          <Form.Input
            type="password"
            field="comparedPassword"
            placeholder={comparedPlaceholder}
            style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
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
              {translate({ zh_hant: '上一步', zh_hans: '上一步', lang })}
            </Button>
            <Button
              type="submit"
              bgColor="green"
              style={{ width: 80 }}
              disabled={isSubmitting}
            >
              {translate({ zh_hant: '確認', zh_hans: '确认', lang })}
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

    handleSubmit: (values, { props, setSubmitting }: any) => {
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
      <Mutation mutation={MUTATION_RESET_PASSWORD}>
        {reset => <MainForm submitAction={reset} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

export default ResetForm
