import gql from 'graphql-tag'

import Description from './Description'
import InfoHeader from './InfoHeader'
import SideParticipants from './SideParticipants'

export const CAMPAIGN_DETAIL = gql`
  query CampaignDetail($shortHash: String!) {
    campaign(input: { shortHash: $shortHash }) {
      id
      shortHash
      ... on WritingChallenge {
        ...InfoHeaderCampaignPublic
        ...InfoHeaderCampaignPrivate
        ...DescriptionCampaign
        ...SideParticipantsCampaignPublic
        ...SideParticipantsCampaignPrivate
      }
    }
  }
  ${InfoHeader.fragments.campaign.public}
  ${InfoHeader.fragments.campaign.private}
  ${Description.fragments}
  ${SideParticipants.fragments.public}
  ${SideParticipants.fragments.private}
`
