import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import {
  CommentFormType,
  IconPin24,
  IconUnPin24,
  Menu,
  useMutation,
} from '~/components'
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
  type: CommentFormType
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
              id="RFzVUD"
              description="src/components/Comment/DropdownActions/PinButton.tsx"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Unpin Comment"
              id="X+Xvgq"
              description="src/components/Comment/DropdownActions/PinButton.tsx"
            />
          )
        }
        icon={<IconUnPin24 size="mdS" />}
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
            id="AGcU5J"
            description="src/components/Comment/DropdownActions/PinButton.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Pin Comment"
            id="jJ1Brc"
            description="src/components/Comment/DropdownActions/PinButton.tsx"
          />
        )
      }
      icon={<IconPin24 size="mdS" />}
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
