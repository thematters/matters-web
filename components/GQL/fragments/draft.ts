import gql from 'graphql-tag'

export default {
  publishState: gql`
    fragment PublishStateDraft on Draft {
      id
      publishState
      scheduledAt
    }
  `
}
