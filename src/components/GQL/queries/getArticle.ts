import gql from 'graphql-tag'

export const GET_ARTICLE_BY_SHORT_HASH = gql`
  query GetArticleByShortHash($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      id
      title
      slug
      shortHash
    }
  }
`
