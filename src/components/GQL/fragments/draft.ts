import { gql } from '@apollo/client'

export default {
  publishState: gql`
    fragment PublishStateDraft on Draft {
      id
      publishState
      article {
        id
        title
        slug
        mediaHash
        author {
          id
          userName
        }
      }
    }
  `,
}
