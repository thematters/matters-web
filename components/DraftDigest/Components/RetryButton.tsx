import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Mutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'

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
    <Mutation mutation={RETRY_PUBLISH} variables={{ id }}>
      {retry => (
        <button
          type="button"
          onClick={() =>
            retry({
              optimisticResponse: {
                retryPublish: {
                  id,
                  scheduledAt: new Date(
                    Date.now() + 1000 * 60 * 2
                  ).toISOString(),
                  publishState: 'pending',
                  __typename: 'Draft'
                }
              }
            })
          }
        >
          <Translate
            zh_hant={TEXT.zh_hant.retry}
            zh_hans={TEXT.zh_hans.retry}
          />
        </button>
      )}
    </Mutation>
  )
}

export default RetryButton
