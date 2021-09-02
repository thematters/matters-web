import gql from 'graphql-tag'

export const CIRCLE_INCOME_ANALYTICS = gql`
  query CircleIncomeAnalytics($userName: String!) {
    user(input: { userName: $userName }) {
      id
      ownCircles {
        id
        analytics {
          income {
            history {
              value
              date
            }
            thisMonth
            nextMonth
            total
          }
        }
      }
    }
  }
`
