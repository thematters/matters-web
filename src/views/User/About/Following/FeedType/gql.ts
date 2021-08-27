import gql from 'graphql-tag'

export const fragments = {
  user: gql`
    fragment FollowingFeedTypeUser on User {
      id
      following {
        tags(input: { first: 0 }) {
          totalCount
        }
        users(input: { first: 0 }) {
          totalCount
        }
      }
    }
  `,
}
