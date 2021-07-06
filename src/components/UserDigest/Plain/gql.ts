import gql from 'graphql-tag'

export const fragments = {
  user: gql`
    fragment UserDigestPlainUser on User {
      id
      userName
      displayName
    }
  `,
}
