import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconPin from '@/public/static/icons/24px/pin.svg'
import IconUnpin from '@/public/static/icons/24px/unpin.svg'
import {
  CommentThreadCommentType,
  Icon,
  Menu,
  toast,
  useMutation,
} from '~/components'
import { updateArticleComments } from '~/components/GQL'
import { TOGGLE_ARTICLE_PIN_COMMENT } from '~/components/GQL/mutations/togglePinComment'
import {
  CommentPinButtonCommentFragment,
  ToggleArticlePinCommentMutation,
} from '~/gql/graphql'

const fragments = {
  comment: gql`
    fragment CommentPinButtonComment on Comment {
      id
      pinned
      node {
        ... on Article {
          id
          pinCommentLeft
        }
      }
    }
  `,
}

const PinButton = ({
  comment,
  pinnedComment,
}: {
  comment: CommentPinButtonCommentFragment
  pinnedComment?: CommentThreadCommentType
}) => {
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const canPin = !pinnedComment

  const [unpinComment] = useMutation<ToggleArticlePinCommentMutation>(
    TOGGLE_ARTICLE_PIN_COMMENT,
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
  const [pinComment] = useMutation<ToggleArticlePinCommentMutation>(
    TOGGLE_ARTICLE_PIN_COMMENT,
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
            id="/kUr1+"
            description="src/components/ArticleComment/DropdownActions/PinButton.tsx"
          />
        }
        icon={<Icon icon={IconUnpin} size={20} />}
        onClick={async () => {
          await unpinComment()
        }}
      />
    )
  }

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Pin"
          id="ddJbkg"
          description="src/components/ArticleComment/DropdownActions/PinButton.tsx"
        />
      }
      icon={<Icon icon={IconPin} size={20} />}
      onClick={
        canPin
          ? () => pinComment()
          : () =>
              toast.info({
                message: (
                  <FormattedMessage
                    defaultMessage="Only one comment can be pinned to the top"
                    id="qTHZmd"
                    description="src/components/ArticleComment/DropdownActions/PinButton.tsx"
                  />
                ),
              })
      }
    />
  )
}

PinButton.fragments = fragments

export default PinButton
