import gql from 'graphql-tag'

import { DonationDialog } from '~/components'

import Donators from './Donators'

export const fragments = {
  article: gql`
    fragment SupportWidgetArticle on Article {
      id
      author {
        ...UserDonationRecipient
      }
      ...DonatorsArticle
    }
    ${Donators.fragments.article}
    ${DonationDialog.fragments.recipient}
  `,
}
