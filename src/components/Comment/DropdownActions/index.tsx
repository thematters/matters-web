import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  BlockUserButton,
  Button,
  DropdownDialog,
  Icon,
  Menu,
  Translate,
  ViewerContext
} from '~/components'

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
    ${BlockUserButton.fragments.user}
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

  const Content = ({ type }: { type: 'dialog' | 'dropdown' }) => {
    const isDropdown = type === 'dropdown'

    return (
      <Menu width={isDropdown ? 'sm' : undefined}>
        {hasPinButton && <PinButton comment={comment} />}
        {hasEditButton && editComment && (
          <EditButton editComment={editComment} />
        )}
        {hasDeleteButton && <DeleteButton commentId={comment.id} />}
        {hasBlockUserButton && <BlockUserButton user={comment.author} />}
        {hasCollapseButton && <CollapseButton comment={comment} />}
      </Menu>
    )
  }

  return (
    <DropdownDialog
      dropdown={{
        content: <Content type="dropdown" />,
        placement: 'bottom-end'
      }}
      dialog={{
        content: <Content type="dialog" />,
        title: (
          <Translate
            zh_hant={TEXT.zh_hant.moreActions}
            zh_hans={TEXT.zh_hans.moreActions}
          />
        ),
        showHeader: false
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

DropdownActions.fragments = fragments

export default DropdownActions
