import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
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

import ProfileAvatarUploader from './ProfileAvatarUploader'
import ProfileCoverUploader from './ProfileCoverUploader'
import styles from './styles.css'

import {
  UpdateUserInfoProfile,
  UpdateUserInfoProfile_updateUserInfo
} from './__generated__/UpdateUserInfoProfile'

export type ProfileEditorUser = UpdateUserInfoProfile_updateUserInfo

interface FormProps {
  user: ProfileEditorUser
  closeDialog: () => void
}

interface FormValues {
  displayName: string
  description: string
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoProfile($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      avatar
      displayName
      info {
        description
      }
    }
  }
`

const ProfileEditor: React.FC<FormProps> = ({ user, closeDialog }) => {
  const [update] = useMutation<UpdateUserInfoProfile>(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const formId = 'user-profile-editor'

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
      displayName: user.displayName || '',
      description: user.info.description || ''
    },
    validate: ({ displayName, description }) => {
      return {
        displayName: validateDisplayName(displayName, lang, viewer.isAdmin),
        description: validateDescription(description, lang)
      }
    },
    onSubmit: async ({ displayName, description }, { setSubmitting }) => {
      try {
        await update({ variables: { input: { displayName, description } } })
      } catch (error) {
        // TODO: Handle error
      }

      setSubmitting(false)
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className="cover-field">
        <ProfileCoverUploader user={user} />
      </section>

      <section className="avatar-field">
        <ProfileAvatarUploader user={user} />
      </section>

      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.displayName}
            zh_hans={TEXT.zh_hans.displayName}
          />
        }
        type="text"
        name="displayName"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterDisplayName,
          zh_hans: TEXT.zh_hans.enterDisplayName,
          lang
        })}
        hint={
          <Translate
            zh_hant={TEXT.zh_hant.displayNameHint}
            zh_hans={TEXT.zh_hans.displayNameHint}
          />
        }
        value={values.displayName}
        error={touched.displayName && errors.displayName}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Textarea
        label={
          <Translate
            zh_hant={TEXT.zh_hant.userProfile}
            zh_hans={TEXT.zh_hans.userProfile}
          />
        }
        name="description"
        required
        placeholder={translate({
          zh_hant: '請輸入個人簡介',
          zh_hans: '请输入个人简介',
          lang
        })}
        hint={
          <Translate
            zh_hant={TEXT.zh_hant.descriptionHint}
            zh_hans={TEXT.zh_hans.descriptionHint}
          />
        }
        value={values.description}
        error={touched.description && errors.description}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <style jsx>{styles}</style>
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!_isEmpty(errors) || isSubmitting}
      text={
        <Translate zh_hant={TEXT.zh_hant.save} zh_hans={TEXT.zh_hans.save} />
      }
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="編輯資料" zh_hans="编辑资料" />}
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}

export default ProfileEditor
