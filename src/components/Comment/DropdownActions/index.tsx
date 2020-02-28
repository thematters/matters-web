import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  Icon,
  Menu,
  Translate,
  ViewerContext
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { TEXT } from '~/common/enums'

import CollapseButton from './CollapseButton'
import DeleteComment from './DeleteComment'
import EditButton from './EditButton'
import PinButton from './PinButton'

import { DropdownActionsComment } from './__generated__/DropdownActionsComment'

interface DropdownActionsProps {
  comment: DropdownActionsComment
  editComment?: () => void
}

interface Controls {
  hasPinButton: boolean
  hasEditButton: boolean
  hasDeleteButton: boolean
  hasBlockUserButton: boolean
  hasCollapseButton: boolean
}

interface DialogProps {
  openDeleteCommentDialog?: () => void
  openBlockUserDialog?: () => void
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
      ...PinButtonComment
      ...CollapseButtonComment
    }
    ${PinButton.fragments.comment}
    ${BlockUser.fragments.user}
    ${CollapseButton.fragments.comment}
  `
}

const BaseDropdownActions = ({
  comment,
  editComment,
  hasPinButton,
  hasEditButton,
  hasDeleteButton,
  hasBlockUserButton,
  hasCollapseButton,
  openDeleteCommentDialog,
  openBlockUserDialog
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasPinButton && <PinButton comment={comment} />}
      {hasEditButton && editComment && <EditButton editComment={editComment} />}
      {hasDeleteButton && openDeleteCommentDialog && (
        <DeleteComment.Button openDialog={openDeleteCommentDialog} />
      )}
      {hasBlockUserButton && openBlockUserDialog && (
        <BlockUser.Button
          user={comment.author}
          openDialog={openBlockUserDialog}
        />
      )}
      {hasCollapseButton && <CollapseButton comment={comment} />}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end'
      }}
      dialog={{
        content: <Content />,
        title: <Translate id="moreActions" />
      }}
    >
      {({ open, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgHoverColor="grey-lighter"
          compensation="right"
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
  const { comment, editComment } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === comment.article.author.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isCollapsed = comment.state === 'collapsed'
  const isDescendantComment = comment.parentComment

  const controls = {
    hasPinButton: !!(isArticleAuthor && isActive && !isDescendantComment),
    hasEditButton: !!(isCommentAuthor && !!editComment && isActive),
    hasDeleteButton: !!(isCommentAuthor && isActive),
    hasBlockUserButton: !isCommentAuthor,
    hasCollapseButton: !!(
      isArticleAuthor &&
      !isCommentAuthor &&
      (isActive || isCollapsed)
    )
  }

  if (_isEmpty(_pickBy(controls)) || viewer.isInactive) {
    return null
  }

  if (!controls.hasDeleteButton && !controls.hasBlockUserButton) {
    return <BaseDropdownActions {...props} {...controls} />
  }

  if (!controls.hasDeleteButton && controls.hasBlockUserButton) {
    return (
      <BlockUser.Dialog user={comment.author}>
        {({ open: openBlockUserDialog }) => (
          <BaseDropdownActions
            {...props}
            {...controls}
            openBlockUserDialog={openBlockUserDialog}
          />
        )}
      </BlockUser.Dialog>
    )
  }

  if (controls.hasDeleteButton && !controls.hasBlockUserButton) {
    return (
      <DeleteComment.Dialog commentId={comment.id}>
        {({ open: openDeleteCommentDialog }) => (
          <BaseDropdownActions
            {...props}
            {...controls}
            openDeleteCommentDialog={openDeleteCommentDialog}
          />
        )}
      </DeleteComment.Dialog>
    )
  }

  return (
    <DeleteComment.Dialog commentId={comment.id}>
      {({ open: openDeleteCommentDialog }) => (
        <BlockUser.Dialog user={comment.author}>
          {({ open: openBlockUserDialog }) => (
            <BaseDropdownActions
              {...props}
              {...controls}
              openDeleteCommentDialog={openDeleteCommentDialog}
              openBlockUserDialog={openBlockUserDialog}
            />
          )}
        </BlockUser.Dialog>
      )}
    </DeleteComment.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
