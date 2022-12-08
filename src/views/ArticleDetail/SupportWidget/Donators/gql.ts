import gql from 'graphql-tag'

import { DonatorsDialog, UserDigest } from '~/components'
import { Avatar } from '~/components/Avatar'

export const fragments = {
  article: gql`
    fragment DonatorsArticle on Article {
      id
      donations: transactionsReceivedBy(
        input: { first: 9, purpose: donation }
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
      ...DonatorDialogArticle
    }
    ${Avatar.fragments.user}
    ${UserDigest.Plain.fragments.user}
    ${DonatorsDialog.fragments.article}
  `,
}
