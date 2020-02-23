import gql from 'graphql-tag'

import { Button, Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

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
    <Button
      size={[null, '1.25rem']}
      spacing={[0, 'xtight']}
      bgHoverColor="red"
      onClick={() => retry()}
    >
      <TextIcon
        color="white"
        icon={<Icon.Right size="xs" />}
        textPlacement="left"
      >
        <Translate id="retry" />
      </TextIcon>
    </Button>
  )
}

export default RetryButton
