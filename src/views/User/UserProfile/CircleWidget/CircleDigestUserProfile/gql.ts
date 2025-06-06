import gql from 'graphql-tag'

export const fragments = {
  circle: gql`
    fragment DigestUserProfileCircle on Circle {
      id
      name
      displayName
      description
    }
  `,
}
