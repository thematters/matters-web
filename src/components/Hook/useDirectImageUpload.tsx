import { useState } from 'react'

import { EDITOR_IMAGE_UPLOAD_PROGRESS } from '~/common/enums'
import { analytics, getFileId } from '~/common/utils'

interface UploadResponse {
  success: boolean
  errors: { message: string }[]
  result?: {
    id?: string
    filename?: string
  }
}

interface UploadResult {
  id: string | undefined
}

export const useDirectImageUpload = () => {
  const [uploading, setUploading] = useState(false)

  const upload = async ({
    uploadURL,
    file,
  }: {
    uploadURL: string
    file: File
  }): Promise<UploadResult> => {
    setUploading(true)

    return new Promise<UploadResult>((resolve, reject) => {
      const started = window?.performance.now() ?? -1
      const formData = new FormData()
      formData.append('file', file)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', uploadURL, true)

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100

          // emit progress event
          window.dispatchEvent(
            new CustomEvent(EDITOR_IMAGE_UPLOAD_PROGRESS, {
              detail: { fileId: getFileId(file), progress: percentComplete },
            })
          )
        }
      })

      xhr.onload = async () => {
        if (xhr.status === 200) {
          try {
            const resData = JSON.parse(xhr.responseText) as UploadResponse

            if (resData?.success !== true) {
              throw new Error(
                `directUpload error: ${resData?.errors?.[0]?.message || 'no success'}`
              )
            }

            analytics.trackEvent('image_upload', {
              uploadURL,
              type: file.type,
              size: file.size,
              delay_msecs: (window?.performance.now() ?? -1) - started,
            })

            resolve({ id: resData?.result?.id })
          } catch (error) {
            reject(error)
          }
        } else {
          reject(new Error('directUpload error: non 200 response'))
        }
      }

      xhr.onerror = () => {
        reject(new Error('directUpload error: network error'))
      }

      xhr.send(formData)
    }).finally(() => {
      setUploading(false)
    })
  }

  return {
    upload,
    uploading,
  }
}
