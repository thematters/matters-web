import gql from 'graphql-tag'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { toast, useMutation } from '~/components'
import {
  PublishState as PublishStateType,
  PublishStateDraftFragment,
  RetryPublishMutation,
} from '~/gql/graphql'

const RETRY_PUBLISH = gql`
  mutation RetryPublish($id: ID!) {
    retryPublish: publishArticle(input: { id: $id }) {
      id
      publishState
    }
  }
`

const ErrorState = ({ draft }: { draft: PublishStateDraftFragment }) => {
  const [retry] = useMutation<RetryPublishMutation>(RETRY_PUBLISH, {
    variables: { id: draft.id },
    optimisticResponse: {
      retryPublish: {
        id: draft.id,
        publishState: PublishStateType.Pending,
        __typename: 'Draft',
      },
    },
  })

  useEffect(() => {
    toast.error({
      message: (
        <FormattedMessage
          defaultMessage="Failed to publish, please try again."
          id="zE51j6"
        />
      ),
      duration: Infinity,
      actions: [
        {
          content: <FormattedMessage defaultMessage="Retry" id="62nsdy" />,
          onClick: () => {
            retry()
          },
        },
      ],
    })
  }, [])

  return null
}

export default ErrorState
