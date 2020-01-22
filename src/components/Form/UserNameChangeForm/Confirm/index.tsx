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
  validateComparedUserName,
  validateUserName
} from '~/common/utils'

import styles from './styles.css'

import { UpdateUserInfoUserName } from './__generated__/UpdateUserInfoUserName'

interface FormProps {
  extraClass?: string[]
  submitCallback: () => void
}

interface FormValues {
  userName: string
  comparedUserName: string
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoUserName($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      userName
    }
  }
`

export const UserNameChangeConfirmForm: React.FC<FormProps> = formProps => {
  const [update] = useMutation<UpdateUserInfoUserName>(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)
  const { extraClass = [], submitCallback } = formProps

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
      userName: '',
      comparedUserName: ''
    },
    validate: ({ userName, comparedUserName }) => {
      const isInvalidUserName = validateUserName(userName, lang)
      const isInvalidComparedUserName = validateComparedUserName(
        userName,
        comparedUserName,
        lang
      )
      return {
        ...(isInvalidUserName ? { userName: isInvalidUserName } : {}),
        ...(isInvalidComparedUserName
          ? { comparedUserName: isInvalidComparedUserName }
          : {})
      }
    },
    onSubmit: async ({ userName }, { setFieldError, setSubmitting }) => {
      try {
        await update({ variables: { input: { userName } } })

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('userName', errorMessage)
      }

      setSubmitting(false)
    }
  })

  const formClass = classNames('form', ...extraClass)

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <Modal.Content>
        <Form.Input
          type="text"
          field="userName"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterUserName,
            zh_hans: TEXT.zh_hans.enterUserName,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          hint={translate({
            zh_hant: TEXT.zh_hant.userNameHint,
            zh_hans: TEXT.zh_hans.userNameHint,
            lang
          })}
        />
        <Form.Input
          type="text"
          field="comparedUserName"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterUserNameAgign,
            zh_hans: TEXT.zh_hans.enterUserNameAgign,
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
        <Modal.FooterButton
          htmlType="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
          width="full"
        >
          <Translate zh_hant={TEXT.zh_hant.done} zh_hans={TEXT.zh_hans.done} />
        </Modal.FooterButton>
      </div>

      <style jsx>{styles}</style>
    </form>
  )
}
