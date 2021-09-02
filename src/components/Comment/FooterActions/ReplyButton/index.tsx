import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  CommentFormDialog,
  CommentFormType,
  IconComment16,
  LanguageContext,
  useResponsive,
  ViewerContext,
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG, PATHS } from '~/common/enums'
import { appendTarget, translate } from '~/common/utils'

import ReplyTo from '../../ReplyTo'

import { ReplyComemnt } from './__generated__/ReplyComemnt'

export interface ReplyButtonProps {
  comment: ReplyComemnt
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
  const { lang } = useContext(LanguageContext)

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      aria-label={translate({ id: 'replyComment', lang })}
      {...props}
    >
      <IconComment16 />
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
  const isSmallUp = useResponsive('sm-up')

  const { id, parentComment, author, node } = comment
  const article = node.__typename === 'Article' ? node : undefined
  const circle = node.__typename === 'Circle' ? node : undefined

  const submitCallback = () => {
    if (replySubmitCallback) {
      replySubmitCallback()
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
      : appendTarget(PATHS.LOGIN, true)

    return <CommentButton {...clickProps} inCard={inCard} disabled={disabled} />
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
      title={article ? 'replyComment' : 'reply'}
      context={<ReplyTo user={author} />}
    >
      {({ openDialog: openCommentFormDialog }) => (
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
