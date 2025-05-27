import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import { Button, Icon, TextIcon, useMutation } from '~/components'
import { RetryPublishMutation } from '~/gql/graphql'

const RETRY_PUBLISH = gql`
  mutation RetryPublish($id: ID!) {
    retryPublish: publishArticle(input: { id: $id }) {
      id
      publishState
    }
  }
`

const RetryButton = ({ id }: { id: string }) => {
  const [retry] = useMutation<RetryPublishMutation>(RETRY_PUBLISH, {
    variables: { id },
    optimisticResponse: {
      retryPublish: {
        id,
        publishState: 'pending' as any,
        __typename: 'Draft',
      },
    },
  })

  return (
    <Button
      size={[null, '1.25rem']}
      spacing={[0, 8]}
      bgActiveColor="red"
      onClick={() => retry()}
    >
      <TextIcon
        color="white"
        icon={<Icon icon={IconRight} size={12} />}
        placement="left"
      >
        <FormattedMessage defaultMessage="Retry" id="62nsdy" />
      </TextIcon>
    </Button>
  )
}

export default RetryButton
