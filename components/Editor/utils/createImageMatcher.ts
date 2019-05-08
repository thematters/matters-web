import getConfig from 'next/config'
import { Quill } from 'react-quill'

import { extractDomain } from '~/common/utils'
import IMAGE_PLACEHOLDER from '~/static/images/image-placeholder.svg'

const Delta = Quill.import('delta')

const {
  publicRuntimeConfig: { SITE_DOMAIN }
} = getConfig()

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
const b64toBlob = (
  b64Data: string,
  contentType: string = '',
  sliceSize: number = 512
) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

const createImageMatcher = (upload: DraftAssetUpload) => (
  node: Element,
  delta: any
) => {
  // prevent recursion
  if (delta.ops[0].insert.imageFigure) {
    return delta
  }

  // get attributes and src
  const { attributes } = delta.ops[0]
  const srcOrg = delta.ops[0].insert.image

  let imageFigure
  // don't upload if copying from matters internally
  // retrieve asset id from url
  const domain = extractDomain(SITE_DOMAIN || '') || 'matters.news'
  if (srcOrg.indexOf(domain) !== -1) {
    const assetId = srcOrg.split('/').slice(-2, -1)[0]

    imageFigure = {
      src: srcOrg,
      assetId
    }
  } else {
    // upload if copying from external resource
    // make placeholder first
    const placeholderId = (+new Date()).toString(36).slice(-5)
    imageFigure = {
      src: IMAGE_PLACEHOLDER,
      id: placeholderId
    }

    let input
    // handle data url
    if (srcOrg.startsWith('data:')) {
      // Split the base64 string in data and contentType
      const block = srcOrg.split(';')
      // Get the content type of the image
      const contentType = block[0].split(':')[1]
      // get the real base64 content of the file
      const realData = block[1].split(',')[1]

      // Convert it to a blob to upload
      const blob = b64toBlob(realData, contentType)
      input = { file: blob }
    } else {
      // handle http url
      input = { url: srcOrg }
    }

    // upload and replace image content
    upload(input).then(({ path, id }: any) => {
      const img = document.getElementById(placeholderId)
      if (img) {
        img.setAttribute('src', path)
        img.setAttribute('data-asset-id', id)
      }
    })
  }

  return new Delta().insert(
    {
      imageFigure
    },
    attributes
  )
}

export default createImageMatcher
