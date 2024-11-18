import gql from 'graphql-tag'

const fragments = {
  articleCount: gql`
    fragment ArticleCountTag on Tag {
      id
      numAuthors
      numArticles
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

export default fragments
