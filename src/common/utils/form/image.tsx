import FileType from 'file-type/browser'
import { FormattedMessage } from 'react-intl'

import {
  ACCEPTED_UPLOAD_IMAGE_TYPES,
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
    getFileType(image).then((fileType) => {
      // mime type
      if (!fileType) {
        return resolve(null)
      }
      const isAcceptedType = ACCEPTED_UPLOAD_IMAGE_TYPES.includes(image.type)
      if (!isAcceptedType) {
        toast.error({
          message: (
            <FormattedMessage
              defaultMessage="Only JPEG, PNG, and GIF and WebP images are supported."
              id="91AzwP"
            />
          ),
        })
        return resolve(null)
      }

      // size limits
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

export const calculateRenderedImageSize = (
  viewportWidth: number,
  viewportHeight: number,
  imageWidth: number,
  imageHeight: number
): { width: number; height: number } => {
  const viewportAspectRatio = viewportWidth / viewportHeight
  const imageAspectRatio = imageWidth / imageHeight

  let renderedWidth: number
  let renderedHeight: number

  if (viewportAspectRatio > imageAspectRatio) {
    // If the viewport aspect ratio is greater than the image aspect ratio, fit by height
    renderedHeight = viewportHeight
    renderedWidth = viewportHeight * imageAspectRatio
  } else {
    // If the viewport aspect ratio is less than or equal to the image aspect ratio, fit by width
    renderedWidth = viewportWidth
    renderedHeight = viewportWidth / imageAspectRatio
  }

  return { width: renderedWidth, height: renderedHeight }
}

export const checkImagesLoaded = async (
  images: NodeListOf<HTMLImageElement>
): Promise<void> => {
  const imagePromises: Promise<void>[] = []

  for (const img of images) {
    if (img.complete) {
      continue
    }

    const imgPromise = new Promise<void>((resolve, reject) => {
      img.addEventListener('load', () => resolve())
      img.addEventListener('error', (err) => reject(err))
    })

    imagePromises.push(imgPromise)
  }

  await Promise.all(imagePromises)
}

export const getValidFiles = async (files: File[]) => {
  const _files = await Promise.all(
    files.map(async (file) => {
      const mime = await validateImage(file)
      return mime ? file : null
    })
  )

  return _files.filter((f) => f !== null) as File[]
}
