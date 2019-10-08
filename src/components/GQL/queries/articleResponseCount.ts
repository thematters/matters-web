import gql from 'graphql-tag'

export default gql`
  query ArticleResponseCount($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      responseCount
    }
  }
`
