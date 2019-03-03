import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { ProfileAvatarUploader } from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'

import { translate } from '~/common/utils'
import ICON_SAVE from '~/static/icons/write.svg?sprite'

import styles from './styles.css'

interface Props {
  user: { [key: string]: any }
  saveCallback?: (value: boolean) => void
}

const MUTATION_UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      info {
        description
      }
    }
  }
`

export const UserProfileEditor: FC<Props> = ({ user, saveCallback }) => {
  const { lang } = useContext(LanguageContext)

  const { displayName } = user

  const validateDescription = (value: string, language: Language) => {
    let result: any
    if (value && value.length > 200) {
      result = {
        zh_hant: `已超過 200 字，目前 ${value.length} 字`,
        zh_hans: `已超过 200 字，目前 ${value.length} 字`
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
    const placeholder = translate({
      zh_hant: '輸入個人簡介',
      zh_hans: '输入个人简介',
      lang
    })

    const hint = translate({
      zh_hant: '建議 50 字以內，最長 200 字。',
      zh_hans: '建议 50 字以内，最长 200 字。',
      lang
    })

    const save = translate({
      zh_hant: '儲存',
      zh_hans: '保存',
      lang
    })

    return (
      <>
        <form className="form" onSubmit={handleSubmit}>
          <Form.Textarea
            field="description"
            placeholder={placeholder}
            values={values}
            errors={errors}
            touched={touched}
            hint={hint}
            handleBlur={handleBlur}
            handleChange={handleChange}
            style={{ height: '5rem', resize: 'none' }}
          />
          <div className="buttons">
            <Button
              type="submit"
              bgColor="green"
              style={{ width: 80 }}
              disabled={isSubmitting}
              icon={<Icon id={ICON_SAVE.id} viewBox={ICON_SAVE.viewBox} />}
            >
              {save}
            </Button>
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      description: user.info.description
    }),

    validate: ({ description }) => {
      const isInvalidDescription = validateDescription(description, lang)
      const errors = {
        ...(isInvalidDescription ? { description: isInvalidDescription } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { description } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }

      submitAction({ variables: { input: { description } } })
        .then(({ data }: any) => {
          if (saveCallback) {
            saveCallback(false)
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
      <section className="content">
        <ProfileAvatarUploader user={user} />
        <section className="info">
          <span className="name">{displayName}</span>
          <Mutation mutation={MUTATION_UPDATE_USER_INFO}>
            {update => <MainForm submitAction={update} />}
          </Mutation>
        </section>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}
