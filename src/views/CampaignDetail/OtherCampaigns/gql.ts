import gql from 'graphql-tag'

import { CampaignDigest } from '~/components'

export const OTHER_CAMPAIGNS = gql`
  query CampaignDetailOtherCampaigns($excludes: [ID!]) {
    campaigns(
      input: { first: 3, filter: { state: active, excludes: $excludes } }
    ) {
      edges {
        node {
          ...CampaignDigestMiniCampaign
        }
      }
    }
  }
  ${CampaignDigest.Mini.fragments.campaign}
`
