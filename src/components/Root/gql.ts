import gql from 'graphql-tag'

import { FeaturesProvider, ViewerProvider } from '~/components'
import { fragments as analyticsUserFragment } from '~/components/Analytics/AnalyticsListener/gql'

import {
  CURATION_CHANNEL_NAMES,
  TOPIC_CHANNEL_NAMES,
  WRITING_CHALLENGE_NAMES,
} from '../GQL/fragments/channel'

const fragments = {
  user: {
    public: gql`
      fragment ViewerPublic on User {
        id
        ...ViewerUserPublic
        ...AnalyticsUser
      }
      ${ViewerProvider.fragments.user.public}
      ${analyticsUserFragment.user}
    `,
    private: gql`
      fragment ViewerPrivate on User {
        id
        ...ViewerUserPrivate
      }
      ${ViewerProvider.fragments.user.private}
    `,
  },
  official: gql`
    fragment Official on Official {
      ...FeatureOfficial
    }
    ${FeaturesProvider.fragments.official}
  `,
}

export const ROOT_QUERY_PRIVATE = gql`
  query RootQueryPrivate {
    viewer {
      ...ViewerPublic
      ...ViewerPrivate
    }
    official {
      ...Official
    }
    channels {
      id
      shortHash
      ...TopicChannelNames
      ...CurationChannelNames
      ...WritingChallengeNames
    }
  }
  ${fragments.user.public}
  ${fragments.user.private}
  ${fragments.official}
  ${TOPIC_CHANNEL_NAMES}
  ${CURATION_CHANNEL_NAMES}
  ${WRITING_CHALLENGE_NAMES}
`
