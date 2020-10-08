import gql from 'graphql-tag'

import assetFragment from '../fragments/asset'

export default gql`
  mutation SingleFileUpload($input: SingleFileUploadInput!) {
    singleFileUpload(input: $input) {
      ...Asset
    }
  }
  ${assetFragment}
`
