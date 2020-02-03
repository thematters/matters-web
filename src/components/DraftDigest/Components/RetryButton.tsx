import gql from 'graphql-tag'

import { Button, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

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
    <Button onClick={() => retry()}>
      <Translate zh_hant={TEXT.zh_hant.retry} zh_hans={TEXT.zh_hans.retry} />
    </Button>
  )
}

export default RetryButton
