import FileType from 'file-type/browser'
import { FormattedMessage } from 'react-intl'

import {
  UPLOAD_GIF_AVATAR_SIZE_LIMIT,
  UPLOAD_IMAGE_AREA_LIMIT,
  UPLOAD_IMAGE_DIMENSION_LIMIT,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'
import { toast } from '~/components'

export const getFileType = (
  file: File
): Promise<FileType.FileTypeResult | undefined> => FileType.fromBlob(file)

// return meme type or null if not valid
export const validateImage = (image: File, isAvatar: boolean = false) =>
  new Promise<string | null>((resolve, reject) => {
    // size limits
    getFileType(image).then((fileType) => {
      if (!fileType) {
        return resolve(null)
      }
      const isGIF = fileType.mime === 'image/gif'
      const sizeLimit =
        isAvatar && isGIF
          ? UPLOAD_GIF_AVATAR_SIZE_LIMIT
          : UPLOAD_IMAGE_SIZE_LIMIT
      const isExceedSizeLimit = image.size > sizeLimit
      if (isExceedSizeLimit) {
        toast.error({
          message: (
            <FormattedMessage
              defaultMessage="{ext, select, gif {GIF format i} other {I} }mages have a {sizeInMB} megabyte (MB) size limit."
              id="bSqeXm"
              values={{ ext: fileType.ext, sizeInMB: sizeLimit / 1024 / 1024 }}
            />
          ),
        })
        return resolve(null)
      }

      // dimension limits
      try {
        const $img = new Image()

        $img.onload = () => {
          const { width, height } = $img
          window.URL.revokeObjectURL($img.src)

          const isExceedDimensionLimit =
            width > UPLOAD_IMAGE_DIMENSION_LIMIT ||
            height > UPLOAD_IMAGE_DIMENSION_LIMIT
          const isExceedAreaLimit = width * height > UPLOAD_IMAGE_AREA_LIMIT

          if (isExceedDimensionLimit) {
            toast.error({
              message: (
                <FormattedMessage
                  defaultMessage="Maximum image dimension is 12,000 pixels."
                  id="Y7N/Jg"
                />
              ),
            })
            return resolve(null)
          }

          if (isExceedAreaLimit) {
            toast.error({
              message: (
                <FormattedMessage
                  defaultMessage="Maximum image area is limited to 100 megapixels (for example, 10,000×10,000 pixels)."
                  id="9Vkz9W"
                />
              ),
            })
            return resolve(null)
          }

          return resolve(fileType.mime)
        }

        $img.src = window.URL.createObjectURL(image)
      } catch (exception) {
        return reject(exception)
      }
    })
  })

interface Dimensions {
  width: number
  height: number
}
export const getImageDimensions = (file: File): Promise<Dimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject

    const url = URL.createObjectURL(file)
    img.src = url
  })
}
