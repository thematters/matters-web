import gql from 'graphql-tag'

import { SupportersDialog, UserDigest } from '~/components'
import { Avatar } from '~/components/Avatar'

export const fragments = {
  article: gql`
    fragment DonatorsArticle on Article {
      id
      donations(input: { first: 50 }) {
        totalCount
        edges {
          cursor
          node {
            id
            sender {
              id
              ...AvatarUser
              ...UserDigestPlainUser
            }
          }
        }
      }
      ...SupportsDialogArticle
    }
    ${Avatar.fragments.user}
    ${UserDigest.Plain.fragments.user}
    ${SupportersDialog.fragments.article}
  `,
}
