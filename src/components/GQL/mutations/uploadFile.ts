import { gql } from '@apollo/client'

import assetFragment from '../fragments/asset'

export default gql`
  mutation SingleFileUpload($input: SingleFileUploadInput!) {
    singleFileUpload(input: $input) {
      ...Asset
    }
  }
  ${assetFragment}
`
