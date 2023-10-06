import { useState } from 'react'

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
      const formData = new FormData()
      formData.append('file', file)
      await fetch(uploadURL, { method: 'POST', body: formData })
      setUploading(false)
    } catch (error) {
      setUploading(false)
      throw error
    }
  }

  return { upload, uploading }
}
