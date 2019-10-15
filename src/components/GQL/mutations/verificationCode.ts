import gql from 'graphql-tag'

export const CONFIRM_CODE = gql`
  mutation ConfirmVerificationCode($input: ConfirmVerificationCodeInput!) {
    confirmVerificationCode(input: $input)
  }
`
