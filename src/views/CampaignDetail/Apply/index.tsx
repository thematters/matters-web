import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = gql`
  fragment ApplyCampaignPrivate on WritingChallenge {
    id
    applicationState
    applicationPeriod {
      start
      end
    }
  }
`

const Apply = {
  Button,
  Dialog,
  fragments,
}

export default Apply
