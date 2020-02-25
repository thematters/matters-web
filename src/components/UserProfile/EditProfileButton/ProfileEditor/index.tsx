import { useFormik } from 'formik'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  AvatarUploader,
  Dialog,
  Form,
  LanguageContext,
  Translate,
  ViewerContext
} from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST, TEXT } from '~/common/enums'
import {
  filterFormErrors,
  parseFormSubmitErrors,
  translate,
  validateDescription,
  validateDisplayName
} from '~/common/utils'

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
  avatar: string | null
  profileCover: string | null
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
        profileCover
        description
      }
    }
  }
`

/**
 * To identify `profileCover` is changed since it may be `null`
 */
const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

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
    isSubmitting,
    isValid,
    setFieldValue
  } = useFormik<FormValues>({
    initialValues: {
      avatar: UNCHANGED_FIELD,
      profileCover: UNCHANGED_FIELD,
      displayName: user.displayName || '',
      description: user.info.description || ''
    },
    validate: ({ displayName, description }) =>
      filterFormErrors({
        displayName: validateDisplayName(displayName, lang, viewer.isAdmin),
        description: validateDescription(description, lang)
      }),
    onSubmit: async (
      { avatar, profileCover, displayName, description },
      { setSubmitting, setFieldError }
    ) => {
      try {
        await update({
          variables: {
            input: {
              ...(avatar !== UNCHANGED_FIELD ? { avatar } : {}),
              ...(profileCover !== UNCHANGED_FIELD ? { profileCover } : {}),
              displayName,
              description
            }
          }
        })

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant={TEXT.zh_hant.successEditUserProfile}
                  zh_hans={TEXT.zh_hans.successEditUserProfile}
                />
              )
            }
          })
        )

        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach(code => {
          if (code.includes('USER_DISPLAYNAME_INVALID')) {
            setFieldError('displayName', messages[code])
          } else {
            setFieldError('description', messages[code])
          }
        })
      }

      setSubmitting(false)
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className="cover-field">
        <ProfileCoverUploader
          user={user}
          onUpload={assetId => setFieldValue('profileCover', assetId)}
        />
      </section>

      <section className="avatar-field">
        <AvatarUploader
          user={user}
          onUpload={assetId => setFieldValue('avatar', assetId)}
          hasBorder
        />
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
            zh_hant={TEXT.zh_hant.hintDisplayName}
            zh_hans={TEXT.zh_hans.hintDisplayName}
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
            zh_hant={TEXT.zh_hant.userDescription}
            zh_hans={TEXT.zh_hans.userDescription}
          />
        }
        name="description"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterUserDescription,
          zh_hans: TEXT.zh_hans.enterUserDescription,
          lang
        })}
        hint={
          <Translate
            zh_hant={TEXT.zh_hant.hintUserDescription}
            zh_hans={TEXT.zh_hans.hintUserDescription}
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
      disabled={!isValid || isSubmitting}
      text={
        <Translate zh_hant={TEXT.zh_hant.save} zh_hans={TEXT.zh_hans.save} />
      }
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant={TEXT.zh_hant.editUserProfile}
            zh_hans={TEXT.zh_hans.editUserProfile}
          />
        }
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
