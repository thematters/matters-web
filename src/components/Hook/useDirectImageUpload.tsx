import { useState } from 'react'

import { analytics } from '~/common/utils'

export const useDirectImageUpload = () => {
  const [uploading, setUploading] = useState(false)

  const upload = async ({
    uploadURL,
    file,
  }: {
    uploadURL: string
    file: File
  }) => {
    setUploading(true)

    try {
      const started = window?.performance.now() ?? -1
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(uploadURL, { method: 'POST', body: formData })
      if (
        !res.ok ||
        !res.headers.get('content-type')?.startsWith('application/json')
      ) {
        throw new Error('directUpload error: non json response')
      }

      const resData = (await res.json()) as {
        success: boolean
        errors: { message: string }[]
        result?: {
          id?: string
          filename?: string
        }
      }

      if (resData?.success !== true) {
        // errors: Uploaded image must have image/jpeg, image/png, image/webp, image/gif or image/svg+xml content-type
        throw new Error(
          `directUpload error: ${resData?.errors?.[0]?.message || 'no success'}`
        )
      }

      analytics.trackEvent('image_upload', {
        uploadURL,
        type: file.type,
        size: file.size,
        // performance.now() = Date.now() - performance.timing.navigationStart
        delay_msecs: (window?.performance.now() ?? -1) - started,
      })

      return {
        id: resData?.result?.id,
      }
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading }
}
