import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  draft: gql`
    fragment SchedulePublishButtonDraft on Draft {
      id
      publishAt
      updatedAt
    }
  `,
}

const SchedulePublish = {
  Dialog,
  Button,
  fragments,
}

export default SchedulePublish
