import gql from 'graphql-tag'

export const fragments = {
  circle: gql`
    fragment DigestPlainCircle on Circle {
      id
      name
      displayName
    }
  `,
}
