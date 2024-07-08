import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  public: gql`
    fragment ApplyCampaignPublic on WritingChallenge {
      id
      applicationPeriod {
        start
        end
      }
    }
  `,
  private: gql`
    fragment ApplyCampaignPrivate on WritingChallenge {
      id
      applicationState
    }
  `,
}

const Apply = {
  Button,
  Dialog,
  fragments,
}

export default Apply
