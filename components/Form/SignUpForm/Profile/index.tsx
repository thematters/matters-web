import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'
import { queries as HOME_FEED } from '~/views/Home/Feed'
import { HOME_TODAY } from '~/views/Home/MattersToday'
import { SIDEBAR_ICYMI } from '~/views/Home/Sidebar/Icymi'
import { SIDEBAR_TOPICS } from '~/views/Home/Sidebar/Topics'

import { Button } from '~/components/Button'
import { SignUpAvatarUploader } from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { Mutation } from '~/components/GQL'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext } from '~/components/Language'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

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

const MUTATION_UPDATE_USER_INFO = gql`
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
    setFieldValue
  }: {
    [key: string]: any
  }) => {
    const formClass = classNames('form', ...extraClass)

    const descriptionPlaceholder = translate({
      zh_hant: '介紹你自己，獲得更多社區關注',
      zh_hans: '介绍你自己，获得更多社区关注',
      lang
    })

    const nextText = translate({
      zh_hant: TEXT.zh_hant.nextStep,
      zh_hans: TEXT.zh_hans.nextStep,
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <SignUpAvatarUploader
            field="avatar"
            lang={lang}
            uploadCallback={setFieldValue}
          />
          <AvatarError field="avatar" errors={errors} touched={touched} />
          <Form.Textarea
            field="description"
            placeholder={descriptionPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            style={{ height: '5rem' }}
          />
          <div className="buttons">
            <Button
              type="submit"
              bgColor="green"
              style={{ minWidth: '5rem' }}
              disabled={isSubmitting}
              icon={isSubmitting ? <IconSpinner /> : null}
            >
              {nextText}
            </Button>
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
      description: ''
    }),

    validate: ({ avatar, description }) => {
      const isValidAvatar = validateAvatar(avatar, lang)
      const isValidDescription = validateDescription(description, lang)
      const errors = {
        ...(isValidAvatar ? { avatar: isValidAvatar } : {}),
        ...(isValidDescription ? { description: isValidDescription } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { avatar, description } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }
      const inputs = {
        description,
        ...(avatar ? { avatar } : {})
      }

      submitAction({ variables: { input: inputs } })
        .then(({ data }: any) => {
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

  const relatedQueries =
    purpose === 'modal'
      ? [
          { query: HOME_FEED.hottest },
          { query: HOME_TODAY },
          { query: SIDEBAR_ICYMI },
          { query: SIDEBAR_TOPICS }
        ]
      : []

  return (
    <>
      <Mutation
        mutation={MUTATION_UPDATE_USER_INFO}
        refetchQueries={relatedQueries}
      >
        {update => <MainForm submitAction={update} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
