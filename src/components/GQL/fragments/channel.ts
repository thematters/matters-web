import gql from 'graphql-tag'

export const CHANNEL_BASE_FIELDS = gql`
  fragment ChannelBaseFields on Channel {
    id
    shortHash
  }
`

export const TOPIC_CHANNEL_NAMES = gql`
  fragment TopicChannelNames on TopicChannel {
    nameZhHans: name(input: { language: zh_hans })
    nameZhHant: name(input: { language: zh_hant })
    nameEn: name(input: { language: en })
  }
`

export const CURATION_CHANNEL_NAMES = gql`
  fragment CurationChannelNames on CurationChannel {
    nameZhHans: name(input: { language: zh_hans })
    nameZhHant: name(input: { language: zh_hant })
    nameEn: name(input: { language: en })
  }
`

export const WRITING_CHALLENGE_NAMES = gql`
  fragment WritingChallengeNames on WritingChallenge {
    nameZhHans: name(input: { language: zh_hans })
    nameZhHant: name(input: { language: zh_hant })
    nameEn: name(input: { language: en })
  }
`

export const FULL_CHANNEL = gql`
  fragment FullChannel on Channel {
    ...ChannelBaseFields

    ... on TopicChannel {
      ...TopicChannelNames
    }

    ... on CurationChannel {
      ...CurationChannelNames
    }

    ... on WritingChallenge {
      ...WritingChallengeNames
    }
  }
  ${CHANNEL_BASE_FIELDS}
  ${TOPIC_CHANNEL_NAMES}
  ${CURATION_CHANNEL_NAMES}
  ${WRITING_CHALLENGE_NAMES}
`
