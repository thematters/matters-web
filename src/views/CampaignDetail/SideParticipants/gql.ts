import gql from 'graphql-tag'

import { Avatar } from '~/components'

export const fragments = {
  public: gql`
    fragment SideParticipantsCampaignPublic on WritingChallenge {
      id
      shortHash
      sideParticipants: participants(input: { first: null }) {
        totalCount
        edges {
          cursor
          node {
            id
            displayName
            userName
            ...AvatarUser
          }
        }
      }
    }
    ${Avatar.fragments.user}
  `,
  private: gql`
    fragment SideParticipantsCampaignPrivate on WritingChallenge {
      id
      application {
        state
      }
    }
  `,
}
