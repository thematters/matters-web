import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useState } from 'react'

import {
  AvatarUploader,
  CoverUploader,
  Dialog,
  Form,
  IconChecked,
  LanguageContext,
  Translate,
  useMutation,
} from '~/components'

import { ADD_TOAST, ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import {
  parseFormSubmitErrors,
  translate,
  validateDescription,
  validateDisplayName,
} from '~/common/utils'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'

import styles from './styles.css'

import {
  EditProfileDialogUserPrivate,
  EditProfileDialogUserPrivate_info_cryptoWallet_nfts,
} from './__generated__/EditProfileDialogUserPrivate'
import { EditProfileDialogUserPublic } from './__generated__/EditProfileDialogUserPublic'
import { UpdateUserInfoProfile } from './__generated__/UpdateUserInfoProfile'

interface FormProps {
  user: EditProfileDialogUserPublic & Partial<EditProfileDialogUserPrivate>
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

const TravlogNFTImage = ({
  index,
  selectedIndex,
  nft: { id, name, description, imagePreviewUrl },
  onClick,
}: {
  index: number
  selectedIndex: number
  nft: EditProfileDialogUserPrivate_info_cryptoWallet_nfts
  onClick: (event?: React.MouseEvent<HTMLElement>) => any
}) => {
  return (
    <span>
      <img
        src={imagePreviewUrl as string}
        alt={name}
        title={`${name}\n- ${description}`}
        onClick={onClick}
      />
      {index === selectedIndex && (
        <div className="checked">
          <IconChecked size="md" color="green" />
        </div>
      )}
      <style jsx>{styles}</style>
    </span>
  )
}

const EditProfileDialogContent: React.FC<FormProps> = ({
  user,
  closeDialog,
}) => {
  const [update] = useMutation<UpdateUserInfoProfile>(
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

  const [selectedNFTIndex, setSelectedNFTIndex] = useState<number>(-1)

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
      </section>

      <section className="avatar-field">
        <AvatarUploader
          user={user}
          onUpload={(assetId) => setFieldValue('avatar', assetId)}
          hasBorder
        />
      </section>

      {Array.isArray(nfts) && nfts.length > 0 && (
        <section className="nft-collection">
          <header>
            <label>
              {translate({
                id: 'myNFTCollections',
                lang,
              })}
              &nbsp;({nfts.length})
            </label>
          </header>
          <section>
            {nfts.map(
              (
                nftProps: EditProfileDialogUserPrivate_info_cryptoWallet_nfts,
                index: number
              ) => (
                <TravlogNFTImage
                  key={nftProps.id}
                  index={index}
                  selectedIndex={selectedNFTIndex}
                  nft={nftProps}
                  onClick={() => {
                    setSelectedNFTIndex(index)
                    setFieldValue('avatar', nftProps.imagePreviewUrl)
                  }}
                />
              )
              /* <CachedOpenSeaImg {...{id, imagePreviewUrl}} /> */
            )}
            {/* <pre>{JSON.stringify(user.info.cryptoWallet?.nfts)}</pre> */}
          </section>
          <footer>點擊圖片替換頭像</footer>
        </section>
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
