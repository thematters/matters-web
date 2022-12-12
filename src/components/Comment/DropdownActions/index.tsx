import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  CommentFormDialog,
  CommentFormType,
  DropdownDialog,
  IconMore16,
  LanguageContext,
  Menu,
  Translate,
  ViewerContext,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { ADD_TOAST } from '~/common/enums'
import { translate } from '~/common/utils'

import CollapseComment from './CollapseComment'
import DeleteComment from './DeleteComment'
import EditButton from './EditButton'
import PinButton from './PinButton'
import UncollapseButton from './UncollapseButton'

import { DropdownActionsCommentPrivate } from './__generated__/DropdownActionsCommentPrivate'
import { DropdownActionsCommentPublic } from './__generated__/DropdownActionsCommentPublic'

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
  comment: DropdownActionsCommentPublic & Partial<DropdownActionsCommentPrivate>
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
  const { lang } = useContext(LanguageContext)

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
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

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ openDialog, type: popupType, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup={popupType}
          onClick={openDialog}
          ref={ref}
        >
          <IconMore16 color="grey" />
        </Button>
      )}
    </DropdownDialog>
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
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
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
