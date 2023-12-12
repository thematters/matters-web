import { ApolloError } from 'apollo-client'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import {
  ASSET_TYPE,
  ENTITY_TYPE,
  ERROR_CODES,
  MAX_USER_DESCRIPTION_LENGTH,
  MAX_USER_DISPLAY_NAME_LENGTH,
} from '~/common/enums'
import { parseFormSubmitErrors, validateDisplayName } from '~/common/utils'
import {
  AvatarUploader,
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  toast,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  EditProfileDialogUserPublicFragment,
  UpdateUserInfoProfileMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  user: EditProfileDialogUserPublicFragment
  // user: DropdownActionsUserPublic & Partial<DropdownActionsUserPrivate>
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

const EditProfileDialogContent: React.FC<FormProps> = ({
  user,
  closeDialog,
}) => {
  const [update] = useMutation<UpdateUserInfoProfileMutation>(
    UPDATE_USER_INFO,
    undefined,
    { showToast: false }
  )
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const formId = 'edit-profile-form'

  const intl = useIntl()

  const validateDescription = (value: string, lang: Language) => {
    if (value.length > MAX_USER_DESCRIPTION_LENGTH) {
      return intl.formatMessage(
        {
          defaultMessage: 'Over 140 words, current {numbers}',
          id: 'DUoV1W',
          description: 'src/components/Dialogs/EditProfileDialog/Content.tsx',
        },
        {
          numbers: value.length,
        }
      )
    }
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      avatar: UNCHANGED_FIELD,
      profileCover: UNCHANGED_FIELD,
      displayName: user.displayName || '',
      description: user.info.description || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ displayName, description }) =>
      _pickBy({
        displayName: validateDisplayName(displayName, lang, viewer.isAdmin),
        description: validateDescription(description, lang),
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
              description,
            },
          },
        })

        toast.success({
          message: <FormattedMessage defaultMessage="Saved" id="fsB/4p" />,
        })

        setSubmitting(false)
        closeDialog()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
        codes.forEach((code) => {
          if (code === ERROR_CODES.DISPLAYNAME_INVALID) {
            setFieldError(
              'displayName',
              intl.formatMessage({
                defaultMessage:
                  'Must be between 2-20 characters long. Chinese characters, letters, numbers and underscores are allowed.',
                id: 'E8W3qa',
              })
            )
          } else {
            setFieldError('description', intl.formatMessage(messages[code]))
          }
        })
      }
    },
  })

  const [avatarLoading, setAvatarLoading] = useState(false)
  const [coverLoading, setCoverLoading] = useState(false)
  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className={styles.coverField}>
        <CoverUploader
          assetType={ASSET_TYPE.profileCover}
          cover={user.info.profileCover}
          fallbackCover={IMAGE_COVER.src}
          entityType={ENTITY_TYPE.user}
          type="userProfile"
          inEditor
          onUploaded={(assetId) => setFieldValue('profileCover', assetId)}
          onUploadStart={() => setCoverLoading(true)}
          onUploadEnd={() => setCoverLoading(false)}
        />
      </section>

      <section className={styles.avatarField}>
        <AvatarUploader
          user={user}
          onUploaded={(assetId) => setFieldValue('avatar', assetId)}
          onUploadStart={() => setAvatarLoading(true)}
          onUploadEnd={() => setAvatarLoading(false)}
          hasBorder
        />
      </section>

      <Form.Input
        type="text"
        name="displayName"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Name',
          id: 'HAlOn1',
        })}
        value={values.displayName}
        hint={`${values.displayName.length}/${MAX_USER_DISPLAY_NAME_LENGTH}`}
        error={touched.displayName && errors.displayName}
        hintAlign={touched.displayName && errors.displayName ? 'left' : 'right'}
        onBlur={handleBlur}
        onChange={handleChange}
        maxLength={MAX_USER_DISPLAY_NAME_LENGTH}
        spacingTop="base"
        spacingBottom="base"
      />

      <Form.Textarea
        name="description"
        placeholder={intl.formatMessage({
          defaultMessage: 'Bio',
          id: '2W0f9h',
        })}
        maxLength={MAX_USER_DESCRIPTION_LENGTH}
        value={values.description}
        hint={`${values.description.length}/${MAX_USER_DESCRIPTION_LENGTH}`}
        error={touched.description && errors.description}
        hintAlign={touched.description && errors.description ? 'left' : 'right'}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting || coverLoading || avatarLoading}
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={isSubmitting || coverLoading || avatarLoading}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Edit profile" id="nYrKWp" />}
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
        hasSmUpTitle={false}
      />

      <Dialog.Content noMaxHeight>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default EditProfileDialogContent
