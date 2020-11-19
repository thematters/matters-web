import gql from 'graphql-tag'

import { Tag } from '~/components'

export const RECOMMEND_TAGS = gql`
  query RecommendTags($random: NonNegativeInt) {
    viewer @connection(key: "viewerRecommendTags") {
      id
      recommendation {
        tags(input: { first: 5, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              cover
              description
              ...DigestTag
            }
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`
