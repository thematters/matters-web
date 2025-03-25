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
        }
      }
    }
  `,
}

export default fragments
