import gql from 'graphql-tag'

// import { MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'

export const fragments = {
  article: gql`
    fragment VersionsArticle on Article {
      id
      slug
      mediaHash
      author {
        id
        userName
      }
      versions(input: { first: 5 }) {
        edges {
          node {
            id
            createdAt
          }
        }
      }
    }
  `,
}
