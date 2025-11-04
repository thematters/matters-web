import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import ArticleFeeds from './ArticleFeeds'
import InfoHeader from './InfoHeader'
import SideParticipants from './SideParticipants'

export const CAMPAIGN_DETAIL_PUBLIC = gql`
  query CampaignDetailPublic($shortHash: String!) {
    campaign(input: { shortHash: $shortHash }) {
      id
      shortHash
      ... on WritingChallenge {
        id
        showOther
        showAd
        ...InfoHeaderCampaignPublic
        ...InfoHeaderCampaignPrivate
        ...SideParticipantsCampaignPublic
        ...SideParticipantsCampaignPrivate
        ...ArticleFeedsCampaignPublic
      }
    }
  }
  ${InfoHeader.fragments.campaign.public}
  ${InfoHeader.fragments.campaign.private}
  ${SideParticipants.fragments.public}
  ${SideParticipants.fragments.private}
  ${ArticleFeeds.fragments.public}
`

export const CAMPAIGN_DETAIL_PRIVATE = gql`
  query CampaignDetailPrivate($shortHash: String!) {
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        id
        ...InfoHeaderCampaignPrivate
        ...SideParticipantsCampaignPrivate
        ...ArticleFeedsCampaignPrivate
      }
    }
  }
  ${InfoHeader.fragments.campaign.private}
  ${SideParticipants.fragments.private}
  ${ArticleFeeds.fragments.private}
`

export const GET_PARTICIPANTS = gql`
  query GetParticipants($shortHash: String!, $after: String) {
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        id
        application {
          state
        }
        participants(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserDigestRichUserPublic
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
`
