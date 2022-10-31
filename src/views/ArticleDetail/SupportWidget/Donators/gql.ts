import gql from 'graphql-tag'

import { DonatorsDialog } from '~/components'
import { Avatar } from '~/components/Avatar'

export const fragments = {
  article: gql`
    fragment DonatorsArticle on Article {
      id
      donations: transactionsReceivedBy(
        input: { first: 8, purpose: donation }
      ) {
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
      ...DonatorDialogArticle
    }
    ${Avatar.fragments.user}
    ${DonatorsDialog.fragments.article}
  `,
}
