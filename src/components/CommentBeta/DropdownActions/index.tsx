import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  Button,
  CommentFormType,
  Dropdown,
  IconMore16,
  Menu,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import {
  DropdownActionsCommentPrivateFragment,
  DropdownActionsCommentPublicFragment,
} from '~/gql/graphql'

import DeleteComment from './DeleteComment'
import type { DeleteCommentDialogProps } from './DeleteComment/Dialog'
import PinButton from './PinButton'

export type DropdownActionsControls = {
  /**
   * options to control visibility
   */
  // force to hide
  hasPin?: boolean

  // based on type
  inCard?: boolean
}

type DropdownActionsProps = {
  comment: DropdownActionsCommentPublicFragment &
    Partial<DropdownActionsCommentPrivateFragment>
  type: CommentFormType
} & DropdownActionsControls

interface Controls {
  hasPin: boolean
  hasDelete: boolean
}

interface DialogProps {
  openDeleteCommentDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const fragments = {
  comment: {
    public: gql`
      fragment DropdownActionsCommentPublic on Comment {
        id
        state
        content
        author {
          id
          ...BlockUserPublic
        }
        parentComment {
          id
        }
        node {
          ... on Circle {
            id
            name
            owner {
              id
            }
          }
          ... on Article {
            id
            mediaHash
            author {
              id
            }
          }
        }
        ...PinButtonComment
      }
      ${PinButton.fragments.comment}
      ${BlockUser.fragments.user.public}
    `,
    private: gql`
      fragment DropdownActionsCommentPrivate on Comment {
        id
        author {
          id
          ...BlockUserPrivate
        }
        node {
          ... on Circle {
            id
            owner {
              id
              isBlocking
            }
          }
          ... on Article {
            id
            author {
              id
              isBlocking
            }
          }
        }
      }
      ${BlockUser.fragments.user.private}
    `,
  },
}

const BaseDropdownActions = ({
  comment,
  type,
  inCard,

  hasPin,
  hasDelete,

  openDeleteCommentDialog,
}: BaseDropdownActionsProps) => {
  const _hasPin =
    hasPin &&
    comment.node.__typename === 'Article' &&
    comment.author.id === comment.node.author.id

  const Content = () => (
    <Menu>
      {_hasPin && <PinButton comment={comment} type={type} />}
      {_hasPin && hasDelete && <Menu.Divider />}
      {hasDelete && (
        <DeleteComment.Button openDialog={openDeleteCommentDialog} />
      )}
    </Menu>
  )

  const intl = useIntl()
  const moreActionText = intl.formatMessage({
    defaultMessage: 'More Actions',
    id: 'A7ugfn',
  })

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <IconMore16 color="black" />
        </Button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { comment, type, hasPin = true } = props
  const viewer = useContext(ViewerContext)
  const { isArchived, isFrozen } = viewer

  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined
  const targetAuthor = article?.author || circle?.owner

  const isTargetAuthor = viewer.id === targetAuthor?.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isDescendantComment = comment.parentComment

  const controls = {
    hasPin: hasPin && !!(isTargetAuthor && isActive && !isDescendantComment),
    hasDelete: !!(isCommentAuthor && isActive),
  }

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  if (_isEmpty(_pickBy(controls)) || isArchived) {
    return null
  }

  const WithDeleteComment = withDialog<
    Omit<DeleteCommentDialogProps, 'children'>
  >(
    BaseDropdownActions,
    DeleteComment.Dialog,
    {
      comment,
      type,
    },
    ({ openDialog }) => {
      return {
        ...props,
        ...controls,
        openDeleteCommentDialog: isFrozen ? forbid : openDialog,
      }
    }
  )

  return <WithDeleteComment />
}

DropdownActions.fragments = fragments

export default DropdownActions
