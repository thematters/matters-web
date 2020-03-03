import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  CommentFormDialog,
  Icon,
  Translate,
  useResponsive,
  ViewerContext
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_LOGIN_DIALOG,
  PATHS,
  TEXT
} from '~/common/enums'
import { appendTarget } from '~/common/utils'

import { ReplyComemnt } from './__generated__/ReplyComemnt'

export interface ReplyButtonProps {
  comment: ReplyComemnt
  openLikeCoinDialog: () => void
  commentCallback?: () => void
}

const fragments = {
  comment: gql`
    fragment ReplyComemnt on Comment {
      id
      state
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
  `
}

const CommentButton: React.FC<ButtonProps> = props => (
  <Button
    spacing={['xtight', 'xtight']}
    bgHoverColor="grey-lighter"
    aira-label={TEXT.zh_hant.replyComment}
    {...props}
  >
    <Icon.Comment />
  </Button>
)

const ReplyButton = ({
  comment,
  openLikeCoinDialog,
  commentCallback
}: ReplyButtonProps) => {
  const viewer = useContext(ViewerContext)
  const isSmallUp = useResponsive('sm-up')

  const { id, parentComment, state, article } = comment
  const isActive = state === 'active'
  const isCollapsed = state === 'collapsed'
  const isOnboarding = viewer.isOnboarding && article.author.id !== viewer.id
  const isBlocked = article.author.isBlocking
  const isDisabled = !isActive && !isCollapsed && !isOnboarding && !isBlocked

  const submitCallback = () => {
    if (commentCallback) {
      commentCallback()
    }
  }

  if (isDisabled) {
    return <CommentButton disabled />
  }

  if (viewer.shouldSetupLikerID) {
    return <CommentButton onClick={openLikeCoinDialog} />
  }

  if (!viewer.isAuthed) {
    const clickProps = isSmallUp
      ? {
          onClick: () => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
          }
        }
      : appendTarget({ ...PATHS.AUTH_LOGIN, fallbackCurrent: true })

    return <CommentButton {...clickProps} />
  }

  return (
    <CommentFormDialog
      articleId={article.id}
      replyToId={id}
      parentId={parentComment?.id || id}
      submitCallback={submitCallback}
      title={<Translate id="replyComment" />}
    >
      {({ open: openCommentFormDialog }) => (
        <CommentButton onClick={openCommentFormDialog} />
      )}
    </CommentFormDialog>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
