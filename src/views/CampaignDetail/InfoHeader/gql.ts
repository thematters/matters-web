import gql from 'graphql-tag'

import Apply from '../Apply'
import Participants from './Participants'

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
        ...InfoHeaderParticipantsCampaign
      }
      ${Participants.fragments}
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
