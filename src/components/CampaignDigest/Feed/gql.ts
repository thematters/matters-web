import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import CampaignDigestTitle from '../Title'

export const fragments = {
  campaign: gql`
    fragment CampaignDigestFeedCampaign on WritingChallenge {
      id
      ...CampaignDigestTitleCampaign
      cover
      shortHash
      description
      applicationPeriod {
        start
        end
      }
      writingPeriod {
        start
        end
      }
      organizers {
        id
        userName
        ...UserDigestMiniUser
      }
    }
    ${UserDigest.Mini.fragments.user}
    ${CampaignDigestTitle.fragments.campaign}
  `,
}
