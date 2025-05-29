import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import {
  Button,
  ButtonProps,
  CircleCommentFormDialog,
  CircleCommentFormType,
  Icon,
  ViewerContext,
} from '~/components'
import { CircleCommentReplyComemntFragment } from '~/gql/graphql'

import ReplyTo from '../../ReplyTo'

export interface ReplyButtonProps {
  comment: CircleCommentReplyComemntFragment
  type: CircleCommentFormType
  replySubmitCallback?: () => void
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: gql`
    fragment CircleCommentReplyComemnt on Comment {
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

  if (!circle?.id) {
    return null
  }

  return (
    <CircleCommentFormDialog
      circleId={circle?.id}
      type={type}
      replyToId={id}
      parentId={parentComment?.id || id}
      submitCallback={submitCallback}
      title={
        <FormattedMessage
          defaultMessage="Reply"
          id="MRn08S"
          description="src/components/CircleComment/FooterActions/ReplyButton/index.tsx"
        />
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
    </CircleCommentFormDialog>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
