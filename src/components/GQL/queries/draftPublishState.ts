import { gql } from '@apollo/client'

import draftFragments from '~/components/GQL/fragments/draft'

export default gql`
  query DraftPublishState($id: ID!) {
    node(input: { id: $id }) {
      ... on Draft {
        ...PublishStateDraft
      }
    }
  }
  ${draftFragments.publishState}
`
