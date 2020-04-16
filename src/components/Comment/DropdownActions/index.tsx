import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  CommentFormDialog,
  DropdownDialog,
  Icon,
  Menu,
  ViewerContext,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { TEXT } from '~/common/enums'

import CollapseComment from './CollapseComment'
import DeleteComment from './DeleteComment'
import EditButton from './EditButton'
import PinButton from './PinButton'
import UncollapseButton from './UncollapseButton'

import { DropdownActionsComment } from './__generated__/DropdownActionsComment'

interface DropdownActionsProps {
  comment: DropdownActionsComment
  inCard?: boolean
}

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
  comment: gql`
    fragment DropdownActionsComment on Comment {
      id
      state
      author {
        id
        ...BlockUser
      }
      parentComment {
        id
      }
      article {
        id
        mediaHash
        author {
          id
        }
      }
      ...EditButtonComment
      ...PinButtonComment
    }
    ${EditButton.fragments.comment}
    ${PinButton.fragments.comment}
    ${BlockUser.fragments.user}
  `,
}

const BaseDropdownActions = ({
  comment,
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
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasPin && <PinButton comment={comment} />}
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
      {({ open, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <Icon.More color="grey" />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { comment } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === comment.article.author.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isAbleCollapse = isArticleAuthor && !isCommentAuthor
  const isCollapsed = comment.state === 'collapsed'
  const isBlocked = comment.article.author.isBlocking
  const isDescendantComment = comment.parentComment

  const controls = {
    hasPin: !!(isArticleAuthor && isActive && !isDescendantComment),
    hasEdit: !!(isCommentAuthor && !isBlocked && (isActive || isCollapsed)),
    hasDelete: !!(isCommentAuthor && isActive),
    hasBlockUser: !isCommentAuthor,
    hasCollapse: !!(isAbleCollapse && isActive),
    hasUncollapse: !!(isAbleCollapse && isCollapsed),
  }

  if (_isEmpty(_pickBy(controls)) || viewer.isInactive) {
    return null
  }

  return (
    <CommentFormDialog
      commentId={comment.id}
      articleId={comment.article.id}
      defaultContent={comment.content}
      title="editComment"
    >
      {({ open: openEditCommentDialog }) => (
        <DeleteComment.Dialog commentId={comment.id}>
          {({ open: openDeleteCommentDialog }) => (
            <BlockUser.Dialog user={comment.author}>
              {({ open: openBlockUserDialog }) => (
                <CollapseComment.Dialog commentId={comment.id}>
                  {({ open: openCollapseCommentDialog }) => (
                    <BaseDropdownActions
                      {...props}
                      {...controls}
                      openEditCommentDialog={openEditCommentDialog}
                      openDeleteCommentDialog={openDeleteCommentDialog}
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
