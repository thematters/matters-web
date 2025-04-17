import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  public: gql`
    fragment ApplyCampaignPublic on WritingChallenge {
      id
      state
      link
      applicationPeriod {
        start
        end
      }
      writingPeriod {
        start
        end
      }
      stages {
        id
        nameZhHant: name(input: { language: zh_hant })
        nameZhHans: name(input: { language: zh_hans })
        nameEn: name(input: { language: en })
        period {
          start
          end
        }
      }
    }
  `,
  private: gql`
    fragment ApplyCampaignPrivate on WritingChallenge {
      id
      application {
        state
        createdAt
      }
    }
  `,
}

const Apply = {
  Button,
  Dialog,
  fragments,
}

export default Apply
