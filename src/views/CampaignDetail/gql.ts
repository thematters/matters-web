import gql from 'graphql-tag'

import ArticleFeeds from './ArticleFeeds'
import InfoHeader from './InfoHeader'
import SideParticipants from './SideParticipants'

export const CAMPAIGN_DETAIL = gql`
  query CampaignDetail($shortHash: String!) {
    campaign(input: { shortHash: $shortHash }) {
      id
      shortHash
      ... on WritingChallenge {
        descriptionZhHant: description(input: { language: zh_hant })
        descriptionZhHans: description(input: { language: zh_hans })
        descriptionEn: description(input: { language: en })
        ...InfoHeaderCampaignPublic
        ...InfoHeaderCampaignPrivate
        ...SideParticipantsCampaignPublic
        ...SideParticipantsCampaignPrivate
        ...ArticleFeedsCampaign
      }
    }
  }
  ${InfoHeader.fragments.campaign.public}
  ${InfoHeader.fragments.campaign.private}
  ${SideParticipants.fragments.public}
  ${SideParticipants.fragments.private}
  ${ArticleFeeds.fragments}
`
