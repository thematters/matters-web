import { Quill } from 'react-quill'

import { DOMAIN } from '~/common/enums'
import IMAGE_PLACEHOLDER from '~/static/images/image-placeholder.png'

const Delta = Quill.import('delta')

const createImageMatcher = (upload: any, quill: Quill) => (
  node: Element,
  delta: any
) => {
  // prevent recursion
  if (delta.ops[0].insert.imageFigure) {
    return delta
  }

  // replace with placeholder and wrap image with figure
  const { attributes } = delta.ops[0]
  const srcOrg = delta.ops[0].insert.image

  // copying from matters internally
  if (srcOrg.indexOf(DOMAIN) !== -1) {
    const assetId = srcOrg.split('/').slice(-2, -1)[0]

    return new Delta().insert(
      {
        imageFigure: {
          src: srcOrg,
          assetId
        }
      },
      attributes
    )
  }

  // copying from external resource
  const placeholderId = (+new Date()).toString(36).slice(-5)
  upload({
    url: srcOrg
  }).then(({ path, id }: any) => {
    const img = quill.root.querySelector(`#${placeholderId}`)
    if (img) {
      img.setAttribute('src', path)
      img.setAttribute('asset-id', id)
    }
  })

  // return placeholder
  return new Delta().insert(
    {
      imageFigure: {
        src: IMAGE_PLACEHOLDER,
        id: placeholderId
      }
    },
    attributes
  )
}

export default createImageMatcher
