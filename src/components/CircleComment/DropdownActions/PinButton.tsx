import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconPin from '@/public/static/icons/24px/pin.svg'
import IconUnpin from '@/public/static/icons/24px/unpin.svg'
import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import { CircleCommentFormType, Icon, Menu, useMutation } from '~/components'
import { TOGGLE_CIRCLE_PIN_COMMENT } from '~/components/GQL/mutations/togglePinComment'
import {
  CircleCommentPinButtonCommentFragment,
  ToggleCirclePinCommentMutation,
} from '~/gql/graphql'

const fragments = {
  comment: gql`
    fragment CircleCommentPinButtonComment on Comment {
      id
      pinned
      node {
        ... on Circle {
          id
          name
        }
      }
    }
  `,
}

const PinButton = ({
  type,
  comment,
}: {
  type: CircleCommentFormType
  comment: CircleCommentPinButtonCommentFragment
}) => {
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined
  const canPin = !!circle
  const isCircleBroadcast = type === 'circleBroadcast'

  const [unpinComment] = useMutation<ToggleCirclePinCommentMutation>(
    TOGGLE_CIRCLE_PIN_COMMENT,
    {
      variables: { id: comment.id, enabled: false },
      optimisticResponse: {
        togglePinComment: {
          id: comment.id,
          pinned: false,
          node: comment.node,
          __typename: 'Comment',
        },
      },
      update: (cache) => {
        if (!circle || !isCircleBroadcast) {
          return
        }

        cache.evict({
          id: cache.identify({ __typename: 'Circle', id: circle.id }),
          fieldName: 'broadcast',
        })
        cache.gc()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
    }
  )
  const [pinComment] = useMutation<ToggleCirclePinCommentMutation>(
    TOGGLE_CIRCLE_PIN_COMMENT,
    {
      variables: { id: comment.id, enabled: true },
      optimisticResponse: {
        togglePinComment: {
          id: comment.id,
          pinned: true,
          node: comment.node,
          __typename: 'Comment',
        },
      },
      update: (cache) => {
        if (!circle || !isCircleBroadcast) {
          return
        }

        cache.evict({
          id: cache.identify({ __typename: 'Circle', id: circle.id }),
          fieldName: 'broadcast',
        })
        cache.gc()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
    }
  )

  if (comment.pinned) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Unpin Broadcast"
            id="DrBuEI"
            description="src/components/CircleComment/DropdownActions/PinButton.tsx"
          />
        }
        icon={<Icon icon={IconUnpin} size={20} />}
        onClick={async () => {
          await unpinComment()
          window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL))
        }}
      />
    )
  }

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Pin Broadcast"
          id="8gRHks"
          description="src/components/CircleComment/DropdownActions/PinButton.tsx"
        />
      }
      icon={<Icon icon={IconPin} size={20} />}
      onClick={
        canPin
          ? async () => {
              await pinComment()
              window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL))
            }
          : undefined
      }
    />
  )
}

PinButton.fragments = fragments

export default PinButton
