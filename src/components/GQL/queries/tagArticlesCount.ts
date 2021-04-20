import { gql } from '@apollo/client'

import tagFragments from '../fragments/tag'

export default gql`
  query TagArticlesCount($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        ...ArticleCountTag
      }
    }
  }
  ${tagFragments.articleCount}
`
