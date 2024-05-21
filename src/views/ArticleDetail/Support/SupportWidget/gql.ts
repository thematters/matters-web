import gql from 'graphql-tag'

import { CircleDigest } from '~/components'

import { SupportDialog } from '../SupportDialog'
import Donators from './Donators'

export const fragments = {
  article: {
    public: gql`
      fragment SupportWidgetArticlePublic on Article {
        id
        author {
          ...UserDonationRecipient
        }
        access {
          circle {
            id
            ...DigestRichCirclePublic
          }
        }
        requestForDonation
        ...DonatorsArticle
      }
      ${Donators.fragments.article}
      ${SupportDialog.fragments.recipient}
      ${CircleDigest.Rich.fragments.circle.public}
    `,
    private: gql`
      fragment SupportWidgetArticlePrivate on Article {
        id
        access {
          circle {
            id
            ...DigestRichCirclePrivate
          }
        }
      }
      ${CircleDigest.Rich.fragments.circle.private}
    `,
  },
}

export const HAS_DONATED = gql`
  query HasDonated($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        donated
        replyToDonator
      }
    }
  }
`
