import gql from 'graphql-tag'

export default gql`
  mutation AddArticlesTags($id: ID!, $articles: [ID!], $selected: Boolean) {
    addArticlesTags(
      input: { id: $id, articles: $articles, selected: $selected }
    ) {
      id
      articles(input: { first: 0, selected: $selected }) {
        totalCount
      }
    }
  }
`
