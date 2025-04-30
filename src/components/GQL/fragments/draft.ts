import gql from 'graphql-tag'

const fragments = {
  publishState: gql`
    fragment PublishStateDraft on Draft {
      id
      publishState
      campaigns {
        campaign {
          id
        }
      }
      access {
        circle {
          id
        }
      }
      article {
        id
        title
        slug
        shortHash
        author {
          id
          userName
          displayName
        }
        tags {
          id
          content
        }
      }
    }
  `,
}

export default fragments
