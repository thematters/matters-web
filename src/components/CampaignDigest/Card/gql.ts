import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import CampaignDigestTitle from '../Title'

export const fragments = {
  campaign: gql`
    fragment CampaignDigestCardCampaign on WritingChallenge {
      id
      ...CampaignDigestTitleCampaign
      cover
      shortHash
      description
      stages {
        id
        nameZhHant: name(input: { language: zh_hant })
        nameZhHans: name(input: { language: zh_hans })
        nameEn: name(input: { language: en })
        period {
          start
          end
        }
      }
      applicationPeriod {
        start
        end
      }
      writingPeriod {
        start
        end
      }
      participants(input: { first: 3 }) {
        totalCount
        edges {
          node {
            ... on User {
              id
              userName
              ...UserDigestMiniUser
            }
          }
        }
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
