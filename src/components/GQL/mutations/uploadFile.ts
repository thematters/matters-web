import gql from 'graphql-tag'

import assetFragment from '../fragments/asset'

export const SINGLE_FILE_UPLOAD = gql`
  mutation SingleFileUpload($input: SingleFileUploadInput!) {
    singleFileUpload(input: $input) {
      ...Asset
    }
  }
  ${assetFragment}
`

export const DIRECT_IMAGE_UPLOAD = gql`
  mutation DirectImageUpload($input: SingleFileUploadInput!) {
    directImageUpload(input: $input) {
      ...Asset
    }
  }
  ${assetFragment}
`

export const DIRECT_IMAGE_UPLOAD_DONE = gql`
  mutation DirectImageUploadDone(
    $url: url_String_format_uri!
    $type: AssetType!
    $entityType: EntityType!
    $entityId: ID
  ) {
    directImageUpload(
      input: {
        url: $url
        type: $type
        entityType: $entityType
        entityId: $entityId
        draft: false
      }
    ) {
      ...Asset
    }
  }
  ${assetFragment}
`
