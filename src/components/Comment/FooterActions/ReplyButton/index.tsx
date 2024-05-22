import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import {
  Button,
  ButtonProps,
  CommentFormDialog,
  CommentFormType,
  Icon,
  ViewerContext,
} from '~/components'
import { ReplyComemntFragment } from '~/gql/graphql'

import ReplyTo from '../../ReplyTo'

export interface ReplyButtonProps {
  comment: ReplyComemntFragment
  type: CommentFormType
  replySubmitCallback?: () => void
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: gql`
    fragment ReplyComemnt on Comment {
      id
      state
      author {
        id
        ...ReplyToUser
      }
      node {
        ... on Circle {
          id
          owner {
            id
          }
        }
        ... on Article {
          id
          author {
            id
          }
        }
      }
      parentComment {
        id
      }
    }
    ${ReplyTo.fragments.user}
  `,
}

const CommentButton: React.FC<ButtonProps & { inCard: boolean }> = ({
  inCard,
  ...props
}) => {
  const intl = useIntl()

  return (
    <Button
      spacing={[8, 8]}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      aria-label={intl.formatMessage({
        defaultMessage: 'Write a comment',
        id: 'Y8zV4A',
      })}
      {...props}
    >
      <Icon icon={IconComment} />
    </Button>
  )
}

const ReplyButton = ({
  comment,
  type,
  replySubmitCallback,
  onClick,
  disabled,
  inCard,
}: ReplyButtonProps) => {
  const viewer = useContext(ViewerContext)

  const { id, parentComment, author, node } = comment
  const article = node.__typename === 'Article' ? node : undefined
  const circle = node.__typename === 'Circle' ? node : undefined

  const submitCallback = () => {
    if (replySubmitCallback) {
      replySubmitCallback()
    }
  }

  if (!viewer.isAuthed) {
    const props = {
      onClick: () => {
        // deprecated
        // window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
        window.dispatchEvent(
          new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
            detail: { trigger: UNIVERSAL_AUTH_TRIGGER.replyComment },
          })
        )
      },
    }

    return (
      <>
        <CommentButton
          aria-haspopup="dialog"
          inCard={inCard}
          disabled={disabled}
          {...props}
        />
      </>
    )
  }

  if (onClick) {
    return (
      <CommentButton onClick={onClick} inCard={inCard} disabled={disabled} />
    )
  }

  return (
    <CommentFormDialog
      articleId={article?.id}
      circleId={circle?.id}
      type={type}
      replyToId={id}
      parentId={parentComment?.id || id}
      submitCallback={submitCallback}
      title={
        article ? (
          <FormattedMessage
            defaultMessage="Write a comment"
            id="/agKbX"
            description="src/components/Comment/FooterActions/ReplyButton/index.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Reply"
            id="UgpqlF"
            description="src/components/Comment/FooterActions/ReplyButton/index.tsx"
          />
        )
      }
      context={<ReplyTo user={author} />}
    >
      {({ openDialog: openCommentFormDialog }) => (
        <CommentButton
          onClick={openCommentFormDialog}
          inCard={inCard}
          disabled={disabled}
          aria-haspopup="dialog"
        />
      )}
    </CommentFormDialog>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
