import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { FC, useContext } from 'react'

import { SignUpAvatarUploader } from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { Mutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { TEXT } from '~/common/enums'
import { isValidDisplayName, translate } from '~/common/utils'

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
  submitCallback?: () => void
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
  submitCallback
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
      description: ''
    }),

    validate: ({ avatar, displayName, description }) => {
      const isValidAvatar = validateAvatar(avatar, lang)
      const isInvalidDisplayName = validateDisplayName(displayName, lang)
      const isValidDescription = validateDescription(description, lang)
      const errors = {
        ...(isValidAvatar ? { avatar: isValidAvatar } : {}),
        ...(isInvalidDisplayName ? { displayName: isInvalidDisplayName } : {}),
        ...(isValidDescription ? { description: isValidDescription } : {})
      }
      return errors
    },

    handleSubmit: async (values, { props, setSubmitting }: any) => {
      const { avatar, displayName, description } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }

      try {
        await submitAction({
          variables: {
            input: {
              displayName,
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
      <Mutation mutation={UPDATE_USER_INFO}>
        {update => <MainForm submitAction={update} />}
      </Mutation>

      <style jsx>{styles}</style>
    </>
  )
}
