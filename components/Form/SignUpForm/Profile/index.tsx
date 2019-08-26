import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { FC, useContext } from 'react'

import { SignUpAvatarUploader } from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { getErrorCodes, Mutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import { isValidDisplayName, isValidUserName, translate } from '~/common/utils'

import styles from './styles.css'

/**
 * This component is designed for sign up form with builtin mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpProfileForm
 *     extraClass={[]}
 *     purpose="modal"
 *     submitCallback={()=> {}}
 *   />
 * ```
 *
 */

interface Props {
  extraClass?: string[]
  purpose: 'modal' | 'page'
  signUpData: { [key: string]: any }
  submitCallback?: () => void
  backPreviousStep: (event: any) => void
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      avatar
      info {
        description
      }
    }
  }
`

const USER_REGISTER = gql`
  mutation UserRegister($input: UserRegisterInput!) {
    userRegister(input: $input) {
      auth
    }
  }
`

const AvatarError = ({ field, errors, touched }: { [key: string]: any }) => {
  const error = errors[field]
  const isTouched = touched[field]
  return (
    <>
      <div className="info">
        {error && isTouched && <div className="error">{error}</div>}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export const SignUpProfileForm: FC<Props> = ({
  extraClass = [],
  purpose,
  submitCallback,
  backPreviousStep,
  signUpData
}) => {
  const { lang } = useContext(LanguageContext)

  const BaseForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError
  }: {
    [key: string]: any
  }) => {
    const formClass = classNames('form', ...extraClass)

    const displayNamePlaceholder = translate({
      zh_hant: '姓名',
      zh_hans: '姓名',
      lang
    })

    const userNamePlaceholder = translate({
      zh_hant: 'Matters ID',
      zh_hans: 'Matters ID',
      lang
    })

    const descriptionPlaceholder = translate({
      zh_hant: '介紹你自己，獲得更多社區關注',
      zh_hans: '介绍你自己，获得更多社区关注',
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <Modal.Content>
            <SignUpAvatarUploader
              field="avatar"
              lang={lang}
              uploadCallback={setFieldValue}
            />
            <AvatarError field="avatar" errors={errors} touched={touched} />
            <Form.Input
              type="text"
              field="displayName"
              placeholder={displayNamePlaceholder}
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <Form.Input
              type="text"
              field="userName"
              placeholder={userNamePlaceholder}
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
            <Form.Textarea
              field="description"
              placeholder={descriptionPlaceholder}
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              style={{ height: '5rem' }}
              hint={translate({
                zh_hant: TEXT.zh_hant.descriptionHint,
                zh_hans: TEXT.zh_hans.descriptionHint,
                lang
              })}
            />
          </Modal.Content>

          <div className="buttons">
            <button
              type="button"
              className="previous"
              disabled={!_isEmpty(errors) || isSubmitting}
              onClick={backPreviousStep}
            >
              <Translate
                zh_hant={TEXT.zh_hant.previousStep}
                zh_hans={TEXT.zh_hans.previousStep}
              />
            </button>
            <button type="submit" disabled={!_isEmpty(errors) || isSubmitting}>
              <Translate
                zh_hant={TEXT.zh_hant.nextStep}
                zh_hans={TEXT.zh_hans.nextStep}
              />
            </button>
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const validateAvatar = (value: string | null, language: string) => {
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

  const validateDisplayName = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidDisplayName(value)) {
      result = {
        zh_hant: TEXT.zh_hant.displayNameHint,
        zh_hans: TEXT.zh_hans.displayNameHint
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

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

  const validateDescription = (value: string, language: string) => {
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

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      avatar: null,
      displayName: '',
      userName: '',
      description: ''
    }),

    validate: ({ avatar, displayName, userName, description }) => {
      const isValidAvatar = validateAvatar(avatar, lang)
      const isInvalidDisplayName = validateDisplayName(displayName, lang)
      const isInvalidUserName = validateUserName(userName, lang)
      const isValidDescription = validateDescription(description, lang)
      const errors = {
        ...(isValidAvatar ? { avatar: isValidAvatar } : {}),
        ...(isInvalidDisplayName ? { displayName: isInvalidDisplayName } : {}),
        ...(isInvalidUserName ? { userName: isInvalidUserName } : {}),
        ...(isValidDescription ? { description: isValidDescription } : {})
      }
      return errors
    },

    handleSubmit: async (
      values,
      { props, setFieldError, setSubmitting }: any
    ) => {
      const { avatar, userName, displayName, description } = values
      const { preSubmitAction, submitAction } = props
      if (!preSubmitAction || !submitAction) {
        return undefined
      }

      try {
        await preSubmitAction({
          variables: {
            input: {
              email: signUpData.email,
              codeId: signUpData.codeId,
              userName,
              displayName,
              password: signUpData.password
            }
          }
        })
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('userName', errorMessage)
      }

      try {
        await submitAction({
          variables: {
            input: {
              description,
              ...(avatar ? { avatar } : {})
            }
          }
        })
      } catch (e) {
        // do not block the next step since register is successfully
        console.error(e)
      }

      if (submitCallback) {
        submitCallback()
      }

      setSubmitting(false)
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={USER_REGISTER}>
        {register => (
          <Mutation mutation={UPDATE_USER_INFO}>
            {update => (
              <MainForm preSubmitAction={register} submitAction={update} />
            )}
          </Mutation>
        )}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
