import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment ActionsDonationCountArticle on Article {
      id
      transactionsReceivedBy(input: { first: 0, purpose: donation }) {
        totalCount
      }
    }
  `,
}
