import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconPin } from '@/public/static/icons/24px/pin.svg'
import { ReactComponent as IconUnpin } from '@/public/static/icons/24px/unpin.svg'
import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import { CircleCommentFormType, Icon, Menu, useMutation } from '~/components'
import { updateCircleBroadcast } from '~/components/GQL'
import TOGGLE_PIN_COMMENT from '~/components/GQL/mutations/togglePinComment'
import {
  PinButtonCommentFragment,
  TogglePinCommentMutation,
} from '~/gql/graphql'

const fragments = {
  comment: gql`
    fragment PinButtonComment on Comment {
      id
      pinned
      node {
        ... on Article {
          id
          pinCommentLeft
        }
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
  comment: PinButtonCommentFragment
}) => {
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined
  const canPin = !!circle || (article?.pinCommentLeft || 0) > 0
  const isCircleBroadcast = type === 'circleBroadcast'

  const [unpinComment] = useMutation<TogglePinCommentMutation>(
    TOGGLE_PIN_COMMENT,
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

        updateCircleBroadcast({
          cache,
          commentId: comment.id,
          name: circle.name,
          type: 'unpin',
        })
      },
    }
  )
  const [pinComment] = useMutation<TogglePinCommentMutation>(
    TOGGLE_PIN_COMMENT,
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

        updateCircleBroadcast({
          cache,
          commentId: comment.id,
          name: circle.name,
          type: 'pin',
        })
      },
    }
  )

  if (comment.pinned) {
    return (
      <Menu.Item
        text={
          circle ? (
            <FormattedMessage
              defaultMessage="Unpin Broadcast"
              id="DrBuEI"
              description="src/components/CircleComment/DropdownActions/PinButton.tsx"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Unpin Comment"
              id="Zya3dV"
              description="src/components/CircleComment/DropdownActions/PinButton.tsx"
            />
          )
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
        circle ? (
          <FormattedMessage
            defaultMessage="Pin Broadcast"
            id="8gRHks"
            description="src/components/CircleComment/DropdownActions/PinButton.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Pin Comment"
            id="uWUeYl"
            description="src/components/CircleComment/DropdownActions/PinButton.tsx"
          />
        )
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
