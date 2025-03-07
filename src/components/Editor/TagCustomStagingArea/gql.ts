import gql from 'graphql-tag'

import { ListTag } from '~/components/Tag'

export const EDITOR_RECOMMENDED_TAGS = gql`
  query EditorRecommendedTags {
    viewer {
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
