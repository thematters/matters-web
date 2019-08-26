import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { FC, useContext } from 'react'

import { Form } from '~/components/Form'
import { getErrorCodes, Mutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import { isValidUserName, translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  extraClass?: string[]
  submitCallback: () => void
}

const UPDATE_USER_INFO = gql`
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
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidUserName(value)) {
      result = {
        zh_hant: TEXT.zh_hant.userNameHint,
        zh_hans: TEXT.zh_hans.userNameHint
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
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (comparedValue !== value) {
      result = {
        zh_hant: TEXT.zh_hant.invalidUserName,
        zh_hans: TEXT.zh_hans.invalidUserName
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

    const userNameHint = translate({
      zh_hant: TEXT.zh_hant.userNameHint,
      zh_hans: TEXT.zh_hans.userNameHint,
      lang
    })

    const userNamePlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterUserName,
      zh_hans: TEXT.zh_hans.enterUserName,
      lang
    })

    const comparedUserNamePlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterUserNameAgign,
      zh_hans: TEXT.zh_hans.enterUserNameAgign,
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <Modal.Content>
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
          </Modal.Content>
          <div className="buttons">
            <button type="submit" disabled={!_isEmpty(errors) || isSubmitting}>
              <Translate
                zh_hant={TEXT.zh_hant.done}
                zh_hans={TEXT.zh_hans.done}
              />
            </button>
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
          setFieldError('userName', errorMessage)
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={UPDATE_USER_INFO}>
        {update => <MainForm submitAction={update} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
