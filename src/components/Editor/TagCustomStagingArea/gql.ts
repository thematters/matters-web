import gql from 'graphql-tag'

import { ListTag } from '~/components/Tag'

export const EDITOR_RECOMMENDED_TAGS = gql`
  query EditorRecommendedTags($userName: String!) {
    user(input: { userName: $userName }) {
      id
      tags(input: { first: 10 }) {
        edges {
          cursor
          node {
            ...DigestTag
          }
        }
      }
    }
  }
  ${ListTag.fragments.tag}
`
