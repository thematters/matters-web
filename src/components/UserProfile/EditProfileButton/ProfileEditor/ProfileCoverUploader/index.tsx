import VisuallyHidden from '@reach/visually-hidden'
import { useState } from 'react'

import {
  Button,
  IconCameraMedium,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
  ADD_TOAST,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'

import Cover from '../../../Cover'
import styles from './styles.css'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import { ProfileUser } from '~/components/UserProfile/__generated__/ProfileUser'

/**
 * This component is for uploading profile cover.
 *
 * Usage:
 *
 * ```jsx
 *   <ProfileCoverUploader user={user} />
 * ```
 */

interface Props {
  user: ProfileUser
  onUpload: (assetId: string | null) => void
}

export const ProfileCoverUploader: React.FC<Props> = ({ user, onUpload }) => {
  const [cover, setCover] = useState<string | null>(user.info.profileCover)
  const [upload, { loading }] = useMutation<SingleFileUpload>(UPLOAD_FILE)

  const acceptTypes = ACCEPTED_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = 'profile-cover-upload-form'

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!upload || !event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    if (file?.size > UPLOAD_IMAGE_SIZE_LIMIT) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="上傳檔案超過 5 MB"
                zh_hans="上传文件超过 5 MB"
              />
            ),
          },
        })
      )
      return
    }

    try {
      const { data } = await upload({
        variables: {
          input: { file, type: 'profileCover', entityType: 'user' },
        },
      })
      const id = data?.singleFileUpload.id
      const path = data?.singleFileUpload.path

      if (id && path) {
        setCover(path)
        onUpload(id)
      } else {
        throw new Error()
      }
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureUploadImage" />,
          },
        })
      )
    }
  }

  const removeCover = () => {
    setCover(null)
    onUpload(null)
  }

  return (
    <label htmlFor={fieldId}>
      <Cover cover={cover} />

      <div className="mask">
        {loading ? <Spinner /> : <IconCameraMedium color="white" size="xl" />}

        {user.info.profileCover && (
          <section className="delete">
            <Button
              size={[null, '1.25rem']}
              spacing={[0, 'xtight']}
              borderColor="white"
              borderWidth="sm"
              onClick={removeCover}
            >
              <TextIcon color="white" size="xs">
                <Translate id="delete" />
              </TextIcon>
            </Button>
          </section>
        )}
      </div>

      <VisuallyHidden>
        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label="上傳封面"
          accept={acceptTypes}
          multiple={false}
          onChange={handleChange}
        />
      </VisuallyHidden>

      <style jsx>{styles}</style>
    </label>
  )
}

export default ProfileCoverUploader
