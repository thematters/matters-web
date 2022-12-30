import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { ADD_TOAST, ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import {
  parseFormSubmitErrors,
  translate,
  validateDescription,
  validateDisplayName,
} from '~/common/utils'
import {
  AvatarUploader,
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useMutation,
} from '~/components'
import {
  EditProfileDialogUserPrivateFragment,
  EditProfileDialogUserPublicFragment,
  UpdateUserInfoProfileMutation,
} from '~/gql/graphql'

import NFTCollection from './NFTCollection'
import styles from './styles.css'

interface FormProps {
  user: EditProfileDialogUserPublicFragment &
    Partial<EditProfileDialogUserPrivateFragment>
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

  const formId = 'edit-profile-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      avatar: UNCHANGED_FIELD,
      profileCover: UNCHANGED_FIELD,
      displayName: user.displayName || '',
      description: user.info.description || '',
    },
    validate: ({ displayName, description }) =>
      _pickBy({
        displayName: validateDisplayName(displayName, lang),
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

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successEditUserProfile" />,
            },
          })
        )

        setSubmitting(false)
        closeDialog()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        codes.forEach((code) => {
          if (code === 'DISPLAYNAME_INVALID') {
            setFieldError(
              'displayName',
              translate({ id: 'hintDisplayName', lang })
            )
          } else {
            setFieldError('description', messages[code])
          }
        })
      }
    },
  })

  const nfts = user.info.cryptoWallet
    ?.nfts as EditProfileDialogUserPrivate_info_cryptoWallet_nfts[]

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className="cover-field">
        <CoverUploader
          assetType={ASSET_TYPE.profileCover}
          cover={user.info.profileCover}
          fallbackCover={IMAGE_COVER.src}
          entityType={ENTITY_TYPE.user}
          inEditor
          onUpload={(assetId) => setFieldValue('profileCover', assetId)}
        />

        <p className="hint">
          <Translate id="recommendedCoverSize" />
        </p>
      </section>

      <section className="avatar-field">
        <AvatarUploader
          user={user}
          onUpload={(assetId) => setFieldValue('avatar', assetId)}
          hasBorder
        />
      </section>

      {nfts && nfts.length > 0 && (
        <NFTCollection
          nfts={nfts}
          setField={(url: string) => setFieldValue('avatar', url)}
        />
      )}

      <Form.Input
        label={<Translate id="displayName" />}
        type="text"
        name="displayName"
        required
        placeholder={translate({
          id: 'enterDisplayName',
          lang,
        })}
        hint={<Translate id="hintDisplayName" />}
        value={values.displayName}
        error={touched.displayName && errors.displayName}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Textarea
        label={<Translate id="userDescription" />}
        name="description"
        required
        placeholder={translate({
          id: 'enterUserDescription',
          lang,
        })}
        hint={<Translate id="hintDescription" />}
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
      text={<Translate id="save" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title="editUserProfile"
        closeDialog={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default EditProfileDialogContent
