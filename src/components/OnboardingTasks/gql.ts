import gql from 'graphql-tag'

export const ONBOARDING_TASKS_PROGESS = gql`
  query OnboardingTasksProgress {
    viewer {
      id
      followees(input: { first: 0 }) {
        totalCount
      }
      articles(input: { first: 0 }) {
        totalCount
      }
      recommendation {
        followingTags(input: { first: 0 }) {
          totalCount
        }
      }
    }
  }
`
