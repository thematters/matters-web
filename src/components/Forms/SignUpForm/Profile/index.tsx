import classNames from 'classnames'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  SignUpAvatarUploader,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import {
  translate,
  validateAvatar,
  validateDescription,
  validateDisplayName
} from '~/common/utils'

import styles from './styles.css'

import { UpdateUserInfoProfileInit } from './__generated__/UpdateUserInfoProfileInit'

/**
 * This component is designed for sign up form with builtin mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpProfileForm
 *     extraClass={[]}
 *     submitCallback={()=> {}}
 *   />
 * ```
 *
 */

interface FormProps {
  extraClass?: string[]
  submitCallback?: () => void
}

interface FormValues {
  avatar: null | string
  displayName: string
  description: string
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoProfileInit($input: UpdateUserInfoInput!) {
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
    <div className="info">
      {error && isTouched && <div className="error">{error}</div>}

      <style jsx>{styles}</style>
    </div>
  )
}

export const SignUpProfileForm: React.FC<FormProps> = formProps => {
  const [update] = useMutation<UpdateUserInfoProfileInit>(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)
  const { extraClass = [], submitCallback } = formProps

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      avatar: null,
      displayName: '',
      description: ''
    },
    validate: ({ avatar, displayName, description }) => {
      const isValidAvatar = validateAvatar(avatar, lang)
      const isInvalidDisplayName = validateDisplayName(displayName, lang)
      const isValidDescription = validateDescription(description, lang)
      return {
        ...(isValidAvatar ? { avatar: isValidAvatar } : {}),
        ...(isInvalidDisplayName ? { displayName: isInvalidDisplayName } : {}),
        ...(isValidDescription ? { description: isValidDescription } : {})
      }
    },
    onSubmit: async (
      { avatar, displayName, description },
      { props, setSubmitting }: any
    ) => {
      try {
        await update({
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
  })

  const formClass = classNames('form', ...extraClass)

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <Dialog.Content>
        <SignUpAvatarUploader
          field="avatar"
          lang={lang}
          uploadCallback={setFieldValue}
        />
        <AvatarError field="avatar" errors={errors} touched={touched} />
        <Form.Input
          type="text"
          field="displayName"
          placeholder={translate({
            zh_hant: '姓名',
            zh_hans: '姓名',
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <Form.Textarea
          field="description"
          placeholder={translate({
            zh_hant: '介紹你自己，獲得更多社區關注',
            zh_hans: '介绍你自己，获得更多社区关注',
            lang
          })}
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
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate
            zh_hant={TEXT.zh_hant.nextStep}
            zh_hans={TEXT.zh_hans.nextStep}
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </form>
  )
}
