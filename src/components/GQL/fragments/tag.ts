import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'

const fragments = {
  followers: gql`
    fragment FollowersTag on Tag {
      id
      followers(input: { first: 5 }) {
        totalCount
        edges {
          cursor
          node {
            ... on User {
              id
              ...AvatarUser
            }
          }
        }
      }
    }
    ${Avatar.fragments.user}
  `,
  articleCount: gql`
    fragment ArticleCountTag on Tag {
      id
      numAuthors
      numArticles
      articles(input: { first: 0, selected: false }) {
        totalCount
      }
    }
  `,
}

export default fragments
