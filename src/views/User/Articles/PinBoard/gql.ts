import gql from 'graphql-tag'

export const fragments = {
  user: gql`
    fragment PinnedWorksUser on User {
      id
      userName
      pinnedWorks {
        id
        pinned
        title
        cover
        ... on Article {
          slug
          mediaHash
          summary
          author {
            id
            userName
          }
        }
        ... on Collection {
          articles(input: { first: 0 }) {
            totalCount
          }
        }
      }
    }
  `,
}

export const USER_PINNED_WORKS = gql`
  query UserPinnedWorks($userName: String!) {
    user(input: { userName: $userName }) {
      ...PinnedWorksUser
    }
  }
  ${fragments.user}
`
