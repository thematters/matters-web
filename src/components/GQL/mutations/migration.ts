import { gql } from '@apollo/client'

export default gql`
  mutation Migration($input: MigrationInput!) {
    migration(input: $input)
  }
`
