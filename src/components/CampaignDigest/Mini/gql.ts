import gql from 'graphql-tag'

export const fragments = {
  campaign: gql`
    fragment CampaignDigestMiniCampaign on WritingChallenge {
      id
      nameZhHant: name(input: { language: zh_hant })
      nameZhHans: name(input: { language: zh_hans })
      nameEn: name(input: { language: en })
      cover
      shortHash
    }
  `,
}
