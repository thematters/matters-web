import { gql } from '@apollo/client'

export const fragments = {
  circle: gql`
    fragment DigestPlainCircle on Circle {
      id
      name
      displayName
    }
  `,
}
