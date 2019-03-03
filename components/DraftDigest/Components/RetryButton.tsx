import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Translate } from '~/components/Language'

const RETRY_PUBLISH = gql`
  mutation RetryPublish($id: ID!) {
    retryPublish: publishArticle(input: { id: $id }) {
      id
      scheduledAt
      publishState
    }
  }
`

const RetryButton = ({ id }: { id: string }) => {
  return (
    <Mutation
      mutation={RETRY_PUBLISH}
      variables={{ id }}
      optimisticResponse={{
        retryPublish: {
          id,
          scheduledAt: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
          publishState: 'pending',
          __typename: 'Draft'
        }
      }}
    >
      {retry => (
        <button type="button" onClick={() => retry()}>
          <Translate zh_hant="重試" zh_hans="重试" />
        </button>
      )}
    </Mutation>
  )
}

export default RetryButton
