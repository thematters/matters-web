import gql from 'graphql-tag'

import { Avatar } from '~/components'

export const fragments = {
  campaign: {
    public: gql`
      fragment ParticipantsCampaignPublic on Campaign {
        id
        participants(input: { first: null }) {
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
  },
}
