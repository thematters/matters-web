import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { SignUpAvatarUploader } from '~/components/FileUploader'
import Textarea from '~/components/Form/Textarea'
import { LanguageContext } from '~/components/Language'

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

const SignUpProfileForm: FC<Props> = ({
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
      zh_hant: '個人簡介',
      zh_hans: '个人简介',
      lang
    })

    const nextText = translate({
      zh_hant: '下一步',
      zh_hans: '下一步',
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
          <Textarea
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
              style={{ width: 80 }}
              disabled={isSubmitting}
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

export default SignUpProfileForm
