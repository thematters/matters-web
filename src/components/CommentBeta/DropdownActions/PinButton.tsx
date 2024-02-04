import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import {
  CommentFormType,
  IconPin20,
  IconUnPin20,
  Menu,
  useMutation,
} from '~/components'
import { updateArticleComments } from '~/components/GQL'
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
  const canPin = (article?.pinCommentLeft || 0) > 0

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
        if (!article) {
          return
        }

        updateArticleComments({
          cache,
          commentId: comment.id,
          articleId: article.id,
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
        if (!article) {
          return
        }

        updateArticleComments({
          cache,
          commentId: comment.id,
          articleId: article.id,
          type: 'pin',
        })
      },
    }
  )

  if (comment.pinned) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Unpin"
            id="KTg17G"
            description="src/components/Comment/DropdownActions/PinButton.tsx"
          />
        }
        icon={<IconUnPin20 size="mdS" />}
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
          defaultMessage="Pin"
          id="qxKjcm"
          description="src/components/Comment/DropdownActions/PinButton.tsx"
        />
      }
      icon={<IconPin20 size="mdS" />}
      onClick={
        canPin
          ? async () => {
              try {
                await pinComment()
                // TODO: REFETCH_ARTICLE_DETAIL
                // window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL))
              } catch (e) {
                // TODO: toast can't pinned message
              }
            }
          : undefined
      }
    />
  )
}

PinButton.fragments = fragments

export default PinButton
