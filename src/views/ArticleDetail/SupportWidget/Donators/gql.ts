import gql from 'graphql-tag'

import { SupportersDialog, UserDigest } from '~/components'
import { Avatar } from '~/components/Avatar'

export const fragments = {
  article: gql`
    fragment DonatorsArticle on Article {
      id
      donations: transactionsReceivedBy(
        input: { first: 50, purpose: donation }
      ) {
        totalCount
        edges {
          cursor
          node {
            ... on User {
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
