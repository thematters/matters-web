import gql from 'graphql-tag'
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
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import PinButton from './PinButton'

import { DropdownActionsComment } from './__generated__/DropdownActionsComment'

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

const DropdownActions = ({
  comment,
  editComment
}: {
  comment: DropdownActionsComment
  editComment?: () => void
}) => {
  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === comment.article.author.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isCollapsed = comment.state === 'collapsed'
  const isDescendantComment = comment.parentComment

  const hasPinButton = isArticleAuthor && isActive && !isDescendantComment
  const hasEditButton = isCommentAuthor && !!editComment && isActive
  const hasDeleteButton = isCommentAuthor && isActive
  const hasBlockUserButton = !isCommentAuthor
  const hasCollapseButton =
    isArticleAuthor && !isCommentAuthor && (isActive || isCollapsed)

  if (
    (!hasPinButton &&
      !hasEditButton &&
      !hasDeleteButton &&
      !hasBlockUserButton &&
      !hasCollapseButton) ||
    viewer.isInactive
  ) {
    return null
  }

  const Content = ({
    isInDropdown,
    showBlockUserDialog
  }: {
    isInDropdown?: boolean
    showBlockUserDialog: () => void
  }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasPinButton && <PinButton comment={comment} />}
      {hasEditButton && editComment && <EditButton editComment={editComment} />}
      {hasDeleteButton && <DeleteButton commentId={comment.id} />}
      {hasBlockUserButton && (
        <BlockUser.Button
          user={comment.author}
          showDialog={showBlockUserDialog}
        />
      )}
      {hasCollapseButton && <CollapseButton comment={comment} />}
    </Menu>
  )

  return (
    <BlockUser.Dialog user={comment.author}>
      {({ open: showBlockUserDialog }) => (
        <DropdownDialog
          dropdown={{
            content: (
              <Content isInDropdown showBlockUserDialog={showBlockUserDialog} />
            ),
            placement: 'bottom-end'
          }}
          dialog={{
            content: <Content showBlockUserDialog={open} />,
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
      )}
    </BlockUser.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
