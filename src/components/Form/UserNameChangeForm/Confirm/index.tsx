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
import { isValidUserName, translate } from '~/common/utils'

import { UpdateUserInfoUserName } from './__generated__/UpdateUserInfoUserName'
import styles from './styles.css'

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

  const validateUserName = (value: string) => {
    let result
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
      return translate({ ...result, lang })
    }
  }
  const validateComparedUserName = (value: string, comparedValue: string) => {
    let result
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

        <style jsx>{styles}</style>
      </form>
    )
  }

  const MainForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({
      userName: '',
      comparedUserName: ''
    }),

    validate: ({ userName, comparedUserName }) => {
      const isInvalidUserName = validateUserName(userName)
      const isInvalidComparedUserName = validateComparedUserName(
        userName,
        comparedUserName
      )
      const errors = {
        ...(isInvalidUserName ? { userName: isInvalidUserName } : {}),
        ...(isInvalidComparedUserName
          ? { comparedUserName: isInvalidComparedUserName }
          : {})
      }
      return errors
    },

    handleSubmit: async (values, { setFieldError, setSubmitting }) => {
      const { userName } = values

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
  })(InnerForm)

  return <MainForm {...formProps} />
}
