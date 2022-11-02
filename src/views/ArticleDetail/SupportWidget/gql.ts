import gql from 'graphql-tag'

import { CircleDigest, DonationDialog } from '~/components'

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
      ${DonationDialog.fragments.recipient}
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
        replyToDonator
      }
      ${CircleDigest.Rich.fragments.circle.private}
    `,
  },
}

export const HAS_DONATED = gql`
  query HasDonated($mediaHash: String!, $senderId: ID) {
    article(input: { mediaHash: $mediaHash }) {
      donation: transactionsReceivedBy(
        input: { senderId: $senderId, purpose: donation }
      ) {
        totalCount
      }
    }
  }
`
