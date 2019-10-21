import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import { Translate } from '~/components'

import { TEXT } from '~/common/enums'

import { RetryPublish } from './__generated__/RetryPublish'

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
  const [retry] = useMutation<RetryPublish>(RETRY_PUBLISH, {
    variables: { id },
    optimisticResponse: {
      retryPublish: {
        id,
        scheduledAt: new Date(Date.now() + 1000).toISOString(),
        publishState: 'pending' as any,
        __typename: 'Draft'
      }
    }
  })

  return (
    <button type="button" onClick={() => retry()}>
      <Translate zh_hant={TEXT.zh_hant.retry} zh_hans={TEXT.zh_hans.retry} />
    </button>
  )
}

export default RetryButton
