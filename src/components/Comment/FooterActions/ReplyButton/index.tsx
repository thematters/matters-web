import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  CommentFormDialog,
  Icon,
  useResponsive,
  ViewerContext,
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_LOGIN_DIALOG,
  PATHS,
  TEXT,
} from '~/common/enums'
import { appendTarget } from '~/common/utils'

import ReplyTo from '../../ReplyTo'

import { ReplyComemnt } from './__generated__/ReplyComemnt'

export interface ReplyButtonProps {
  comment: ReplyComemnt
  commentCallback?: () => void
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
      article {
        id
        author {
          id
          isBlocking
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
}) => (
  <Button
    spacing={['xtight', 'xtight']}
    bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
    aira-label={TEXT.zh_hant.replyComment}
    {...props}
  >
    <Icon.Comment />
  </Button>
)

const ReplyButton = ({
  comment,
  commentCallback,
  onClick,
  disabled,
  inCard,
}: ReplyButtonProps) => {
  const viewer = useContext(ViewerContext)
  const isSmallUp = useResponsive('sm-up')

  const { id, parentComment, author, article } = comment

  const submitCallback = () => {
    if (commentCallback) {
      commentCallback()
    }
  }

  if (!viewer.isAuthed) {
    const clickProps = isSmallUp
      ? {
          onClick: () => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
          },
        }
      : appendTarget(PATHS.AUTH_LOGIN, true)

    return <CommentButton {...clickProps} inCard={inCard} disabled={disabled} />
  }

  if (onClick) {
    return (
      <CommentButton onClick={onClick} inCard={inCard} disabled={disabled} />
    )
  }

  return (
    <CommentFormDialog
      articleId={article.id}
      replyToId={id}
      parentId={parentComment?.id || id}
      submitCallback={submitCallback}
      title="replyComment"
      context={<ReplyTo user={author} />}
    >
      {({ open: openCommentFormDialog }) => (
        <CommentButton
          onClick={openCommentFormDialog}
          inCard={inCard}
          disabled={disabled}
        />
      )}
    </CommentFormDialog>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
