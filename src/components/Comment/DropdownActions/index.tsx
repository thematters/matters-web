import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconMore } from '@/public/static/icons/24px/more.svg'
import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  Button,
  CommentFormDialog,
  CommentFormType,
  Dropdown,
  Icon,
  Menu,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import { BlockUserDialogProps } from '~/components/BlockUser/Dialog'
import type { CommentFormDialogProps } from '~/components/Dialogs/CommentFormDialog'
import {
  DropdownActionsCommentPrivateFragment,
  DropdownActionsCommentPublicFragment,
} from '~/gql/graphql'

import CollapseComment from './CollapseComment'
import { CollapseCommentDialogProps } from './CollapseComment/Dialog'
import DeleteComment from './DeleteComment'
import type { DeleteCommentDialogProps } from './DeleteComment/Dialog'
import EditButton from './EditButton'
import PinButton from './PinButton'
import UncollapseButton from './UncollapseButton'

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
  hasEdit: boolean
  hasDelete: boolean
  hasBlockUser: boolean
  hasCollapse: boolean
  hasUncollapse: boolean
}

interface DialogProps {
  openEditCommentDialog: () => void
  openDeleteCommentDialog: () => void
  openBlockUserDialog: () => void
  openCollapseCommentDialog: () => void
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
            shortHash
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
  hasEdit,
  hasDelete,
  hasBlockUser,
  hasCollapse,
  hasUncollapse,

  openEditCommentDialog,
  openDeleteCommentDialog,
  openBlockUserDialog,
  openCollapseCommentDialog,
}: BaseDropdownActionsProps) => {
  const Content = () => (
    <Menu>
      {hasPin && <PinButton comment={comment} type={type} />}
      {hasEdit && <EditButton openEditCommentDialog={openEditCommentDialog} />}
      {hasDelete && (
        <DeleteComment.Button openDialog={openDeleteCommentDialog} />
      )}
      {hasBlockUser && (
        <BlockUser.Button
          user={comment.author}
          openDialog={openBlockUserDialog}
        />
      )}
      {hasCollapse && (
        <CollapseComment.Button openDialog={openCollapseCommentDialog} />
      )}
      {hasUncollapse && <UncollapseButton commentId={comment.id} />}
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
          spacing={[8, 8]}
          bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <Icon icon={IconMore} color="grey" />
        </Button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { comment, type, hasPin = true } = props
  const viewer = useContext(ViewerContext)
  const { isArchived, isBanned, isFrozen } = viewer

  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined
  const targetAuthor = article?.author || circle?.owner

  const isTargetAuthor = viewer.id === targetAuthor?.id
  const isBlocked = targetAuthor?.isBlocking
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isAbleCollapse = isTargetAuthor && !isCommentAuthor
  const isCollapsed = comment.state === 'collapsed'
  const isDescendantComment = comment.parentComment

  const controls = {
    hasPin: hasPin && !!(isTargetAuthor && isActive && !isDescendantComment),
    hasEdit: !!(isCommentAuthor && !isBlocked && (isActive || isCollapsed)),
    hasDelete: !!(isCommentAuthor && isActive),
    hasBlockUser: !isCommentAuthor,
    hasCollapse: !!(isAbleCollapse && isActive),
    hasUncollapse: !!(isAbleCollapse && isCollapsed),
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

  const WithEditComment = withDialog<Omit<CommentFormDialogProps, 'children'>>(
    BaseDropdownActions,
    CommentFormDialog,
    {
      articleId: article?.id,
      circleId: circle?.id,
      type,
      commentId: comment.id,
      defaultContent: comment.content,
      title: article ? (
        <FormattedMessage
          defaultMessage="Edit Comment"
          id="9OIqBr"
          description="src/components/Comment/DropdownActions/index.tsx"
        />
      ) : (
        <FormattedMessage
          defaultMessage="Edit"
          id="LYl9+i"
          description="src/components/Comment/DropdownActions/index.tsx"
        />
      ),
    },
    ({ openDialog }) => {
      return {
        ...props,
        ...controls,
        openEditCommentDialog: isBanned || isFrozen ? forbid : openDialog,
      }
    }
  )
  const WithDeleteComment = withDialog<
    Omit<DeleteCommentDialogProps, 'children'>
  >(
    WithEditComment,
    DeleteComment.Dialog,
    {
      comment,
      type,
    },
    ({ openDialog }) => {
      return {
        openDeleteCommentDialog: isFrozen ? forbid : openDialog,
      }
    }
  )
  const WithBlockUser = withDialog<Omit<BlockUserDialogProps, 'children'>>(
    WithDeleteComment,
    BlockUser.Dialog,
    {
      user: comment.author,
    },
    ({ openDialog }) => {
      return {
        openBlockUserDialog: openDialog,
      }
    }
  )
  const WithCollapseComment = withDialog<
    Omit<CollapseCommentDialogProps, 'children'>
  >(
    WithBlockUser,
    CollapseComment.Dialog,
    {
      comment,
      type,
    },
    ({ openDialog }) => {
      return {
        openCollapseCommentDialog: openDialog,
      }
    }
  )

  return <WithCollapseComment />
}

DropdownActions.fragments = fragments

export default DropdownActions
