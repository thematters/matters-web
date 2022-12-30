import gql from 'graphql-tag'

import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import {
  CommentFormType,
  IconPin24,
  IconUnPin24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import { TogglePinComment } from '~/components/GQL/mutations/__generated__/TogglePinComment'
import TOGGLE_PIN_COMMENT from '~/components/GQL/mutations/togglePinComment'
import updateCircleBroadcast from '~/components/GQL/updates/circleBroadcast'

import { PinButtonComment } from './__generated__/PinButtonComment'

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
  comment: PinButtonComment
}) => {
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined
  const canPin = !!circle || (article?.pinCommentLeft || 0) > 0
  const isCircleBroadcast = type === 'circleBroadcast'

  const [unpinComment] = useMutation<TogglePinComment>(TOGGLE_PIN_COMMENT, {
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
  })
  const [pinComment] = useMutation<TogglePinComment>(TOGGLE_PIN_COMMENT, {
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
  })

  if (comment.pinned) {
    return (
      <Menu.Item
        onClick={async () => {
          await unpinComment()
          window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL))
        }}
      >
        <TextIcon icon={<IconUnPin24 size="md" />} size="md" spacing="base">
          <Translate
            id={circle ? 'unpinCircleComment' : 'unpinArticleComment'}
          />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item
      onClick={
        canPin
          ? async () => {
              await pinComment()
              window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL))
            }
          : undefined
      }
    >
      <TextIcon icon={<IconPin24 size="md" />} size="md" spacing="base">
        <Translate id={circle ? 'pinCircleComment' : 'pinArticleComment'} />
      </TextIcon>
    </Menu.Item>
  )
}

PinButton.fragments = fragments

export default PinButton
