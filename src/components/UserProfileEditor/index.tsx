import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import {
  Button,
  Form,
  Icon,
  LanguageContext,
  ProfileAvatarUploader,
  ProfileCoverUploader,
  Translate,
  ViewerContext
} from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import {
  translate,
  validateDescription,
  validateDisplayName
} from '~/common/utils'

import { TextIcon } from '../TextIcon'
import styles from './styles.css'

import { UpdateUserInfoProfile } from './__generated__/UpdateUserInfoProfile'

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
              <Form className="form" onSubmit={handleSubmit}>
                <Form.Input
                  label={
                    <Translate
                      zh_hant={TEXT.zh_hant.displayName}
                      zh_hans={TEXT.zh_hans.displayName}
                    />
                  }
                  type="text"
                  name="displayName"
                  value={values.displayName}
                  error={touched.displayName && errors.displayName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={translate({
                    zh_hant: '輸入姓名',
                    zh_hans: '输入姓名',
                    lang
                  })}
                  hint={
                    <Translate
                      zh_hant={TEXT.zh_hant.displayNameHint}
                      zh_hans={TEXT.zh_hans.displayNameHint}
                    />
                  }
                />
                <Form.Textarea
                  label={
                    <Translate
                      zh_hant={TEXT.zh_hant.userProfile}
                      zh_hans={TEXT.zh_hans.userProfile}
                    />
                  }
                  name="description"
                  placeholder={translate({
                    zh_hant: '輸入個人簡介',
                    zh_hans: '输入个人简介',
                    lang
                  })}
                  value={values.description}
                  error={touched.description && errors.description}
                  hint={
                    <Translate
                      zh_hant={TEXT.zh_hant.descriptionHint}
                      zh_hans={TEXT.zh_hans.descriptionHint}
                    />
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ height: '7rem', resize: 'none' }}
                />
                <div className="buttons">
                  <Button
                    size={[null, '2rem']}
                    spacing={[0, 'base']}
                    bgColor="green"
                    type="submit"
                    disabled={!_isEmpty(errors) || isSubmitting}
                  >
                    <TextIcon
                      color="white"
                      weight="md"
                      icon={
                        isSubmitting ? (
                          <Icon.Spinner size="sm" />
                        ) : (
                          <Icon.Pen size="sm" />
                        )
                      }
                    >
                      <Translate
                        zh_hant={TEXT.zh_hant.save}
                        zh_hans={TEXT.zh_hans.save}
                      />
                    </TextIcon>
                  </Button>

                  <Button
                    size={[null, '2rem']}
                    spacing={[0, 'base']}
                    bgColor="grey-lighter"
                    disabled={isSubmitting}
                    onClick={() => setEditing(false)}
                  >
                    <TextIcon color="grey" weight="md">
                      <Translate
                        zh_hant={TEXT.zh_hant.cancel}
                        zh_hans={TEXT.zh_hans.cancel}
                      />
                    </TextIcon>
                  </Button>
                </div>
              </Form>
            </section>
          </section>
        </section>
      </div>

      <style jsx>{styles}</style>
    </>
  )
}
