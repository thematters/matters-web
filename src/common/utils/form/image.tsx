import { FormattedMessage } from 'react-intl'

import {
  UPLOAD_IMAGE_AREA_LIMIT,
  UPLOAD_IMAGE_DIMENSION_LIMIT,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from '~/common/enums'
import { toast } from '~/components'

export const validateImage = (image: File) =>
  new Promise<boolean>((resolve, reject) => {
    // size limits
    const isExceedSizeLimit = image.size > UPLOAD_IMAGE_SIZE_LIMIT
    if (isExceedSizeLimit) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Images have a 5 megabyte (MB) size limit."
            id="OyvGvT"
          />
        ),
      })
      return resolve(false)
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
          return resolve(false)
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
          return resolve(false)
        }

        return resolve(true)
      }

      $img.src = window.URL.createObjectURL(image)
    } catch (exception) {
      return reject(exception)
    }
  })
