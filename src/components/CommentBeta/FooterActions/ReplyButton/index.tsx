import gql from 'graphql-tag'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import {
  Button,
  ButtonProps,
  CommentFormType,
  IconComment2V16,
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
      spacing={['xtight', 'xtight']}
      textColor="greyDarker"
      textActiveColor="black"
      aria-label={intl.formatMessage({
        defaultMessage: 'Write a comment',
        id: 'Y8zV4A',
      })}
      {...props}
    >
      <IconComment2V16 size="mdXS" />
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
    <>
      <CommentButton
        onClick={onClick}
        inCard={inCard}
        disabled={disabled}
        aria-haspopup="dialog"
      />
    </>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
