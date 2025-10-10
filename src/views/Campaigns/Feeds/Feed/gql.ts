import gql from 'graphql-tag'

import { CampaignDigest } from '~/components'

export const CAMPAIGNS_PUBLIC = gql`
  query Campaigns($after: String, $state: CampaignsFilterState) {
    campaigns(input: { first: 10, after: $after, filter: { state: $state } }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ...CampaignDigestCardCampaign
          ...CampaignDigestFeedCampaign
        }
      }
    }
  }
  ${CampaignDigest.Card.fragments.campaign}
  ${CampaignDigest.Feed.fragments.campaign}
`
