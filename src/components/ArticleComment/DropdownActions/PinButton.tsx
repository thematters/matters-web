import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconPin } from '@/public/static/icons/24px/pin.svg'
import { ReactComponent as IconUnpin } from '@/public/static/icons/24px/unpin.svg'
import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import {
  ArticleThreadCommentType,
  Icon,
  Menu,
  toast,
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
  comment,
  pinnedComment,
}: {
  comment: PinButtonCommentFragment
  pinnedComment?: ArticleThreadCommentType
}) => {
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const canPin = !pinnedComment

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
            id="/kUr1+"
            description="src/components/ArticleComment/DropdownActions/PinButton.tsx"
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
              toast.success({
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
