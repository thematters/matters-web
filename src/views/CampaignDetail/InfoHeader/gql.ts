import gql from 'graphql-tag'

import Apply from '../Apply'
import Participants from './Participants'

export const fragments = {
  campaign: {
    public: gql`
      fragment InfoHeaderCampaignPublic on WritingChallenge {
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
        ...InfoHeaderParticipantsCampaign
      }
      ${Participants.fragments}
    `,
    private: gql`
      fragment InfoHeaderCampaignPrivate on WritingChallenge {
        id
        ...ApplyCampaignPrivate
      }
      ${Apply.fragments}
    `,
  },
}
