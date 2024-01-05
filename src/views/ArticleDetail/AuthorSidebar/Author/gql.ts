import gql from 'graphql-tag'

import { Avatar } from '~/components'

export const fragments = {
  article: gql`
    fragment AuthorSidebarAuthorArticle on Article {
      id
      author {
        id
        userName
        displayName
        info {
          description
        }
        ...AvatarUser
      }
    }
    ${Avatar.fragments.user}
  `,
}
