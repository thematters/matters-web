import gql from 'graphql-tag'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Button, ButtonProps, Icon, ViewerContext } from '~/components'
import { CommentReplyComemntFragment } from '~/gql/graphql'

import ReplyTo from '../../ReplyTo'

export interface ReplyButtonProps {
  comment: CommentReplyComemntFragment
  replySubmitCallback?: () => void
  onClick?: () => void
  disabled?: boolean
}

const fragments = {
  comment: gql`
    fragment CommentReplyComemnt on Comment {
      id
      state
      author {
        id
        ...ReplyToUser
      }
      node {
        ... on Article {
          id
          author {
            id
          }
        }

        ... on Moment {
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

const CommentButton: React.FC<ButtonProps> = ({ ...props }) => {
  const intl = useIntl()

  return (
    <Button
      spacing={[8, 8]}
      textColor="greyDarker"
      textActiveColor="black"
      aria-label={intl.formatMessage({
        defaultMessage: 'Write a comment',
        id: 'Y8zV4A',
      })}
      {...props}
    >
      <Icon icon={IconComment} size={18} />
    </Button>
  )
}

const ReplyButton = ({ onClick, disabled }: ReplyButtonProps) => {
  const viewer = useContext(ViewerContext)

  if (!viewer.isAuthed) {
    const props = {
      onClick: () => {
        window.dispatchEvent(
          new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
            detail: { trigger: UNIVERSAL_AUTH_TRIGGER.replyComment },
          })
        )
      },
    }

    return (
      <>
        <CommentButton aria-haspopup="dialog" disabled={disabled} {...props} />
      </>
    )
  }

  if (onClick) {
    return <CommentButton onClick={onClick} disabled={disabled} />
  }

  return (
    <>
      <CommentButton
        onClick={onClick}
        disabled={disabled}
        aria-haspopup="dialog"
      />
    </>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
