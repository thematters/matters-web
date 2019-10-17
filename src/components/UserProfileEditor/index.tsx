import { FormikProps, withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'
import { useMutation } from 'react-apollo'

import { Button } from '~/components/Button'
import {
  ProfileAvatarUploader,
  ProfileCoverUploader
} from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext, Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { isValidDisplayName, translate } from '~/common/utils'
import ICON_SAVE from '~/static/icons/write.svg?sprite'

import styles from './styles.css'

interface FormProps {
  user: { [key: string]: any }
  setEditing: (value: boolean) => void
}

interface FormValues {
  displayName: string
  description: string
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoProfile($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      displayName
      info {
        description
      }
    }
  }
`

export const UserProfileEditor: React.FC<FormProps> = formProps => {
  const [update] = useMutation(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const { user, setEditing } = formProps

  const validateDisplayName = (value: string) => {
    let result
    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidDisplayName(value) && !viewer.isAdmin) {
      result = {
        zh_hant: TEXT.zh_hant.displayNameHint,
        zh_hans: TEXT.zh_hans.displayNameHint
      }
    }
    if (result) {
      return translate({ ...result, lang })
    }
  }

  const validateDescription = (value: string) => {
    let result
    if (value && value.length > 200) {
      result = {
        zh_hant: `已超過 200 字，目前 ${value.length} 字`,
        zh_hans: `已超过 200 字，目前 ${value.length} 字`
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
      zh_hant: TEXT.zh_hant.displayNameHint,
      zh_hans: TEXT.zh_hans.displayNameHint,
      lang
    })
    const descriptionHint = translate({
      zh_hant: TEXT.zh_hant.descriptionHint,
      zh_hans: TEXT.zh_hans.descriptionHint,
      lang
    })
    const save = translate({
      zh_hant: TEXT.zh_hant.save,
      zh_hans: TEXT.zh_hans.save,
      lang
    })

    return (
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
          style={{ height: '7rem', resize: 'none' }}
        />
        <div className="buttons">
          <Button
            type="submit"
            bgColor="green"
            style={{ minWidth: '5rem' }}
            disabled={!_isEmpty(errors) || isSubmitting}
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
          <Button
            type="button"
            bgColor="transparent"
            textColor="grey"
            textWeight="normal"
            spacing="default"
            disabled={isSubmitting}
            onClick={() => setEditing(false)}
          >
            <Translate
              zh_hant={TEXT.zh_hant.cancel}
              zh_hans={TEXT.zh_hans.cancel}
            />
          </Button>
        </div>

        <style jsx>{styles}</style>
      </form>
    )
  }

  const MainForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({
      displayName: user.displayName,
      description: user.info.description
    }),

    validate: ({ displayName, description }) => {
      const inInvalidDisplayName = validateDisplayName(displayName)
      const isInvalidDescription = validateDescription(description)
      const errors = {
        ...(inInvalidDisplayName ? { displayName: inInvalidDisplayName } : {}),
        ...(isInvalidDescription ? { description: isInvalidDescription } : {})
      }
      return errors
    },

    handleSubmit: async (values, { setSubmitting }) => {
      const { displayName, description } = values

      try {
        await update({ variables: { input: { displayName, description } } })

        if (setEditing) {
          setEditing(false)
        }
      } catch (error) {
        // TODO: Handle error
      }

      setSubmitting(false)
    }
  })(InnerForm)

  return (
    <>
      <div className="cover-container l-row">
        <section className="l-col-4 l-col-md-8 l-col-lg-12">
          <ProfileCoverUploader user={user} />
        </section>
      </div>

      <div className="content-container l-row">
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <section className="content">
            <ProfileAvatarUploader user={user} />
            <section className="info">
              <MainForm user={user} setEditing={setEditing} />
            </section>
          </section>
        </section>
      </div>

      <style jsx>{styles}</style>
    </>
  )
}
