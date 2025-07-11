import gql from 'graphql-tag'

import { ListTag } from '~/components/Tag'

export const EDITOR_RECENT_TAGS = gql`
  query EditorRecentTags {
    viewer {
      id
      tags(input: { first: 6 }) {
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
