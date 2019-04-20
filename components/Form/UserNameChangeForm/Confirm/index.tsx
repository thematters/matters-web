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
import { isValidUserName, translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  extraClass?: string[]
  submitCallback: () => void
}

const MUTATION_UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      userName
    }
  }
`

export const UserNameChangeConfirmForm: FC<Props> = ({
  extraClass = [],
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const validateUserName = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidUserName(value)) {
      result = {
        zh_hant: '最多輸入至 40 個字元，僅支持英文、數字及 _',
        zh_hans: '最多输入至 40 个字符，仅支持英文、数字及 _'
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateComparedUserName = (
    value: string,
    comparedValue: string,
    language: string
  ) => {
    let result: any
    if (!comparedValue) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (comparedValue !== value) {
      result = { zh_hant: 'Matters ID 不一致', zh_hans: 'Matters ID 不一致' }
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

    const userNameHint = translate({
      zh_hant: '最多輸入至 40 個字元，僅支持英文、數字及 _',
      zh_hans: '最多输入至 40 个字符，仅支持英文、数字及 _',
      lang
    })

    const userNamePlaceholder = translate({
      zh_hant: '請輸入新 Matters ID',
      zh_hans: '请输入新 Matters ID',
      lang
    })

    const comparedUserNamePlaceholder = translate({
      zh_hant: '請再次輸入新 Matters ID',
      zh_hans: '请再次输入新 Matters ID',
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <Form.Input
            type="text"
            field="userName"
            placeholder={userNamePlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            hint={userNameHint}
          />
          <Form.Input
            type="text"
            field="comparedUserName"
            placeholder={comparedUserNamePlaceholder}
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
      userName: '',
      comparedUserName: ''
    }),

    validate: ({ userName, comparedUserName }) => {
      const isInvalidUserName = validateUserName(userName, lang)
      const isInvalidComparedUserName = validateComparedUserName(
        userName,
        comparedUserName,
        lang
      )
      const errors = {
        ...(isInvalidUserName ? { userName: isInvalidUserName } : {}),
        ...(isInvalidComparedUserName
          ? { comparedUserName: isInvalidComparedUserName }
          : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setFieldError, setSubmitting }: any) => {
      const { userName } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }

      submitAction({ variables: { input: { userName } } })
        .then(({ data }: any) => {
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
      <Mutation mutation={MUTATION_UPDATE_USER_INFO}>
        {update => <MainForm submitAction={update} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
