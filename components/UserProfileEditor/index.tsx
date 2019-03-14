import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'

import { Button } from '~/components/Button'
import { ProfileAvatarUploader } from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { Mutation } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext } from '~/components/Language'

import { isValidDisplayName, translate } from '~/common/utils'
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
      displayName
      info {
        description
      }
    }
  }
`

export const UserProfileEditor: FC<Props> = ({ user, saveCallback }) => {
  const { lang } = useContext(LanguageContext)

  const validateDisplayName = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidDisplayName(value)) {
      result = {
        zh_hant: '請輸入 2 至 20 個字元，僅支持中英文及數字',
        zh_hans: '请输入 2 至 20 个字符，仅支持中英文及数字'
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

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
    const displayNamePlaceholder = translate({
      zh_hant: '輸入姓名',
      zh_hans: '输入姓名',
      lang
    })
    const descriptionPlaceholder = translate({
      zh_hant: '輸入個人簡介',
      zh_hans: '输入个人简介',
      lang
    })
    const displayNameHint = translate({
      zh_hant: '2-20 個字符，仅支持中英文或数字',
      zh_hans: '2-20 个字符，仅支持中英文或数字',
      lang
    })
    const descriptionHint = translate({
      zh_hant: '建議 50 字以內，最長 200 字',
      zh_hans: '建议 50 字以内，最长 200 字',
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
          <Form.Input
            type="text"
            field="displayName"
            className={['name']}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            placeholder={displayNamePlaceholder}
            hint={displayNameHint}
          />
          <Form.Textarea
            field="description"
            placeholder={descriptionPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            hint={descriptionHint}
            handleBlur={handleBlur}
            handleChange={handleChange}
            style={{ height: '5rem', resize: 'none' }}
          />
          <div className="buttons">
            <Button
              type="submit"
              bgColor="green"
              style={{ minWidth: '5rem' }}
              disabled={isSubmitting}
              icon={
                isSubmitting ? (
                  <IconSpinner />
                ) : (
                  <Icon id={ICON_SAVE.id} viewBox={ICON_SAVE.viewBox} />
                )
              }
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
      displayName: user.displayName,
      description: user.info.description
    }),

    validate: ({ displayName, description }) => {
      const inInvalidDisplayName = validateDisplayName(displayName, lang)
      const isInvalidDescription = validateDescription(description, lang)
      const errors = {
        ...(inInvalidDisplayName ? { displayName: inInvalidDisplayName } : {}),
        ...(isInvalidDescription ? { description: isInvalidDescription } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { displayName, description } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }

      submitAction({ variables: { input: { displayName, description } } })
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
          <Mutation mutation={MUTATION_UPDATE_USER_INFO}>
            {update => <MainForm submitAction={update} />}
          </Mutation>
        </section>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}
