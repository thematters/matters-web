import { gql } from '@apollo/client'

export const fragments = {
  circle: gql`
    fragment DigestTitleCircle on Circle {
      id
      name
      displayName
    }
  `,
}
