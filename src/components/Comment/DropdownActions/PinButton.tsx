import gql from 'graphql-tag'

import {
  IconPin24,
  IconUnPin24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import TOGGLE_PIN_COMMENT from '~/components/GQL/mutations/togglePinComment'

import { TogglePinComment } from '~/components/GQL/mutations/__generated__/TogglePinComment'
import { PinButtonComment } from './__generated__/PinButtonComment'

const fragments = {
  comment: gql`
    fragment PinButtonComment on Comment {
      id
      pinned
      article {
        id
        pinCommentLeft
      }
    }
  `,
}

const PinButton = ({ comment }: { comment: PinButtonComment }) => {
  const canPin = comment.article.pinCommentLeft > 0
  const [unpinComment] = useMutation<TogglePinComment>(TOGGLE_PIN_COMMENT, {
    variables: { id: comment.id, enabled: false },
    optimisticResponse: {
      togglePinComment: {
        id: comment.id,
        pinned: false,
        article: {
          ...comment.article,
        },
        __typename: 'Comment',
      },
    },
  })
  const [pinComment] = useMutation<TogglePinComment>(TOGGLE_PIN_COMMENT, {
    variables: { id: comment.id, enabled: true },
    optimisticResponse: {
      togglePinComment: {
        id: comment.id,
        pinned: true,
        article: {
          ...comment.article,
        },
        __typename: 'Comment',
      },
    },
  })

  if (comment.pinned) {
    return (
      <Menu.Item onClick={unpinComment}>
        <TextIcon icon={<IconUnPin24 size="md" />} size="md" spacing="base">
          <Translate id="unpin" />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item onClick={canPin ? pinComment : undefined}>
      <TextIcon icon={<IconPin24 size="md" />} size="md" spacing="base">
        <Translate id="pin" />
      </TextIcon>
    </Menu.Item>
  )
}

PinButton.fragments = fragments

export default PinButton
