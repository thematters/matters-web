import gql from 'graphql-tag'

export const fragments = {
  campaign: gql`
    fragment CampaignDigestTitleCampaign on WritingChallenge {
      id
      nameZhHant: name(input: { language: zh_hant })
      nameZhHans: name(input: { language: zh_hans })
      nameEn: name(input: { language: en })
      shortHash
    }
  `,
}
