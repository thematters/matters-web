import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'

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
      zh_hant: TEXT.zh_hant.userProfile,
      zh_hans: TEXT.zh_hans.userProfile,
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

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      avatar: null,
      description: ''
    }),

    validate: ({ description }) => {
      return undefined
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

  return (
    <>
      <Mutation mutation={MUTATION_UPDATE_USER_INFO}>
        {update => <MainForm submitAction={update} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
