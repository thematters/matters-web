import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import { Icon } from '~/components'
import { Button } from '~/components/Button'
import {
  ProfileAvatarUploader,
  ProfileCoverUploader
} from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { useMutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import {
  translate,
  validateDescription,
  validateDisplayName
} from '~/common/utils'

import { UpdateUserInfoProfile } from './__generated__/UpdateUserInfoProfile'
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
  const [update] = useMutation<UpdateUserInfoProfile>(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const { user, setEditing } = formProps

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      displayName: user.displayName,
      description: user.info.description
    },
    validate: ({ displayName, description }) => {
      const inInvalidDisplayName = validateDisplayName(
        displayName,
        lang,
        viewer.isAdmin
      )
      const isInvalidDescription = validateDescription(description, lang)
      return {
        ...(inInvalidDisplayName ? { displayName: inInvalidDisplayName } : {}),
        ...(isInvalidDescription ? { description: isInvalidDescription } : {})
      }
    },
    onSubmit: async ({ displayName, description }, { setSubmitting }) => {
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
  })

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
                  placeholder={translate({
                    zh_hant: '輸入姓名',
                    zh_hans: '输入姓名',
                    lang
                  })}
                  hint={translate({
                    zh_hant: TEXT.zh_hant.displayNameHint,
                    zh_hans: TEXT.zh_hans.displayNameHint,
                    lang
                  })}
                />
                <Form.Textarea
                  field="description"
                  placeholder={translate({
                    zh_hant: '輸入個人簡介',
                    zh_hans: '输入个人简介',
                    lang
                  })}
                  values={values}
                  errors={errors}
                  touched={touched}
                  hint={translate({
                    zh_hant: TEXT.zh_hant.descriptionHint,
                    zh_hans: TEXT.zh_hans.descriptionHint,
                    lang
                  })}
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
                        <Icon.Spinner size="md" />
                      ) : (
                        <Icon.Write size="md" />
                      )
                    }
                  >
                    <Translate
                      zh_hant={TEXT.zh_hant.save}
                      zh_hans={TEXT.zh_hans.save}
                    />
                  </Button>
                  <Button
                    type="button"
                    bgColor="transparent"
                    textColor="grey"
                    textWeight="normal"
                    spacing="loose"
                    disabled={isSubmitting}
                    onClick={() => setEditing(false)}
                  >
                    <Translate
                      zh_hant={TEXT.zh_hant.cancel}
                      zh_hans={TEXT.zh_hans.cancel}
                    />
                  </Button>
                </div>
              </form>
            </section>
          </section>
        </section>
      </div>

      <style jsx>{styles}</style>
    </>
  )
}
