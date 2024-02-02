import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment ActionsDonationCountArticle on Article {
      id
      donations(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}
