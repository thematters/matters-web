import gql from 'graphql-tag'

export const GENERATE_SIGNING_MESSAGE = gql`
  mutation GenerateSigningMessage($input: GenerateSigningMessageInput!) {
    generateSigningMessage(input: $input) {
      nonce
      signingMessage
      createdAt
      expiredAt
    }
  }
`
