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
      await fetch(uploadURL, { method: 'POST', body: formData })

      analytics.trackEvent('image_upload', {
        uploadURL,
        type: file.type,
        size: file.size,
        // performance.now() = Date.now() - performance.timing.navigationStart
        delay_msecs: (window?.performance.now() ?? -1) - started,
      })
      setUploading(false)
    } catch (error) {
      setUploading(false)
      throw error
    }
  }

  return { upload, uploading }
}
