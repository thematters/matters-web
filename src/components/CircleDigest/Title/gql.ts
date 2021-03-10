import gql from 'graphql-tag'

export const fragments = {
  circle: gql`
    fragment DigestTitleCircle on Circle {
      id
      name
      displayName
    }
  `,
}
