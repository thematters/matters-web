import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const CAMPAIGN_ORGANIZERS_PUBLIC = gql`
  query CampaignOrganizers {
    campaignOrganizers(input: { first: 4 }) {
      edges {
        node {
          ...UserDigestRichUserPublic
          ...UserDigestRichUserPrivate
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`
