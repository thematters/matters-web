import gql from 'graphql-tag'

export const CIRCLE_INCOME_ANALYTICS = gql`
  query CircleIncomeAnalytics($name: String!) {
    circle(input: { name: $name }) {
      id
      analytics {
        income {
          history {
            value
            date
          }
          thisMonth
          lastMonth
          total
        }
      }
    }
  }
`
