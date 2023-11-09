import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  Button,
  CommentFormDialog,
  CommentFormType,
  Dropdown,
  IconMore16,
  Menu,
  toast,
  ViewerContext,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import {
  DropdownActionsCommentPrivateFragment,
  DropdownActionsCommentPublicFragment,
} from '~/gql/graphql'

import CollapseComment from './CollapseComment'
import DeleteComment from './DeleteComment'
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
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <IconMore16 color="grey" />
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

  return (
    <CommentFormDialog
      articleId={article?.id}
      circleId={circle?.id}
      type={type}
      commentId={comment.id}
      defaultContent={comment.content}
      title={article ? 'editComment' : 'edit'}
    >
      {({ openDialog: openEditCommentDialog }) => (
        <DeleteComment.Dialog comment={comment} type={type}>
          {({ openDialog: openDeleteCommentDialog }) => (
            <BlockUser.Dialog user={comment.author}>
              {({ openDialog: openBlockUserDialog }) => (
                <CollapseComment.Dialog comment={comment} type={type}>
                  {({ openDialog: openCollapseCommentDialog }) => (
                    <BaseDropdownActions
                      {...props}
                      {...controls}
                      openEditCommentDialog={
                        isBanned || isFrozen ? forbid : openEditCommentDialog
                      }
                      openDeleteCommentDialog={
                        isFrozen ? forbid : openDeleteCommentDialog
                      }
                      openBlockUserDialog={openBlockUserDialog}
                      openCollapseCommentDialog={openCollapseCommentDialog}
                    />
                  )}
                </CollapseComment.Dialog>
              )}
            </BlockUser.Dialog>
          )}
        </DeleteComment.Dialog>
      )}
    </CommentFormDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
