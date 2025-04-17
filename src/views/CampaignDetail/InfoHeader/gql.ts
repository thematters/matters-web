import gql from 'graphql-tag'

import Apply from '../Apply'
import Participants from './Participants'

export const fragments = {
  campaign: {
    public: gql`
      fragment InfoHeaderCampaignPublic on WritingChallenge {
        id
        nameZhHant: name(input: { language: zh_hant })
        nameZhHans: name(input: { language: zh_hans })
        nameEn: name(input: { language: en })
        descriptionZhHant: description(input: { language: zh_hant })
        descriptionZhHans: description(input: { language: zh_hans })
        descriptionEn: description(input: { language: en })
        cover
        applicationPeriod {
          start
          end
        }
        writingPeriod {
          start
          end
        }
        ...ApplyCampaignPublic
        ...InfoHeaderParticipantsCampaign
      }
      ${Participants.fragments}
      ${Apply.fragments.public}
    `,
    private: gql`
      fragment InfoHeaderCampaignPrivate on WritingChallenge {
        id
        ...ApplyCampaignPrivate
      }
      ${Apply.fragments.private}
    `,
  },
}
