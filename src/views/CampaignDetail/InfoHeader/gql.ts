import gql from 'graphql-tag'

import { Avatar } from '~/components'

import Apply from '../Apply'

export const fragments = {
  campaign: {
    public: gql`
      fragment InfoHeaderCampaignPublic on Campaign {
        id
        name
        description
        cover
        link
        applicationPeriod {
          start
          end
        }
        writingPeriod {
          start
          end
        }
        participants(input: { first: 15 }) {
          totalCount
          edges {
            node {
              id
              ...AvatarUser
            }
          }
        }
      }
      ${Avatar.fragments.user}
    `,
    private: gql`
      fragment InfoHeaderCampaignPrivate on Campaign {
        id
        ...ApplyCampaignPrivate
      }
      ${Apply.Button.fragments}
    `,
  },
}
