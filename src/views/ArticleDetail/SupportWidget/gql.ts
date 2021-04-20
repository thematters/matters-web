import { gql } from '@apollo/client'

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
      }
      ${CircleDigest.Rich.fragments.circle.private}
    `,
  },
}
