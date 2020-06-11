import gql from 'graphql-tag'

import {
  IconPinMedium,
  IconUnPinMedium,
  Menu,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'

import { PinButtonComment } from './__generated__/PinButtonComment'
import { PinComment } from './__generated__/PinComment'
import { UnpinComment } from './__generated__/UnpinComment'

const PIN_COMMENT = gql`
  mutation PinComment($id: ID!) {
    pinComment(input: { id: $id }) {
      id
      pinned
      article {
        id
        pinCommentLeft
      }
    }
  }
`

const UNPIN_COMMENT = gql`
  mutation UnpinComment($id: ID!) {
    unpinComment(input: { id: $id }) {
      id
      pinned
      article {
        id
        pinCommentLeft
      }
    }
  }
`

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
  const [unpinComment] = useMutation<UnpinComment>(UNPIN_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unpinComment: {
        id: comment.id,
        pinned: false,
        article: {
          ...comment.article,
        },
        __typename: 'Comment',
      },
    },
  })
  const [pinComment] = useMutation<PinComment>(PIN_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      pinComment: {
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
        <TextIcon icon={<IconUnPinMedium size="md" />} size="md" spacing="base">
          <Translate id="unpin" />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item onClick={canPin ? pinComment : undefined}>
      <TextIcon icon={<IconPinMedium size="md" />} size="md" spacing="base">
        <Translate id="pin" />
      </TextIcon>
    </Menu.Item>
  )
}

PinButton.fragments = fragments

export default PinButton
