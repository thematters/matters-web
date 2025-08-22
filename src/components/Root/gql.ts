import gql from 'graphql-tag'

import { FeaturesProvider, ViewerProvider } from '~/components'
import { fragments as analyticsUserFragment } from '~/components/Analytics/AnalyticsListener/gql'

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

      ... on TopicChannel {
        nameZhHans: name(input: { language: zh_hans })
        nameZhHant: name(input: { language: zh_hant })
        nameEn: name(input: { language: en })
        navbarTitleZhHans: navbarTitle(input: { language: zh_hans })
        navbarTitleZhHant: navbarTitle(input: { language: zh_hant })
        navbarTitleEn: navbarTitle(input: { language: en })
        enabled
      }
      ... on CurationChannel {
        nameZhHans: name(input: { language: zh_hans })
        nameZhHant: name(input: { language: zh_hant })
        nameEn: name(input: { language: en })
        navbarTitleZhHans: navbarTitle(input: { language: zh_hans })
        navbarTitleZhHant: navbarTitle(input: { language: zh_hant })
        navbarTitleEn: navbarTitle(input: { language: en })
        showRecommendation
      }

      ... on WritingChallenge {
        nameZhHans: name(input: { language: zh_hans })
        nameZhHant: name(input: { language: zh_hant })
        nameEn: name(input: { language: en })
        navbarTitleZhHans: navbarTitle(input: { language: zh_hans })
        navbarTitleZhHant: navbarTitle(input: { language: zh_hant })
        navbarTitleEn: navbarTitle(input: { language: en })
      }
    }
  }
  ${fragments.user.public}
  ${fragments.user.private}
  ${fragments.official}
`
