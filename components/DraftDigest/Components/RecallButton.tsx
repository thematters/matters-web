import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Translate } from '~/components/Language'

const RECALL_PUBLISH = gql`
  mutation RecallPublish($id: ID!) {
    recallPublish(input: { id: $id }) {
      id
      scheduledAt
      publishState
    }
  }
`

const RecallButton = ({ id, text }: { id: string; text?: React.ReactNode }) => {
  return (
    <Mutation
      mutation={RECALL_PUBLISH}
      variables={{ id }}
      optimisticResponse={{
        recallPublish: {
          id,
          scheduledAt: null,
          publishState: 'unpublished',
          __typename: 'Draft'
        }
      }}
    >
      {recall => (
        <button type="button" onClick={() => recall()}>
          {text || <Translate zh_hant="取消" zh_hans="取消" />}
        </button>
      )}
    </Mutation>
  )
}

export default RecallButton
