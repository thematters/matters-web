import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Button, Dropdown, Icon, Menu, PopperInstance } from '~/components'
import BlockUserButton from '~/components/Button/BlockUser/Dropdown'
import { ViewerContext } from '~/components/Viewer'

import CollapseButton from './CollapseButton'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import PinButton from './PinButton'

import { DropdownActionsComment } from './__generated__/DropdownActionsComment'
// import ReportButton from './ReportButton'

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
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  /**
   * REMOVE this after implement report comment
   */
  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === comment.article.author.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isCollapsed = comment.state === 'collapsed'
  const isDescendantComment = comment.parentComment

  const isShowPinButton = isArticleAuthor && isActive && !isDescendantComment
  const isShowEditButton = isCommentAuthor && !!editComment && isActive
  const isShowDeleteButton = isCommentAuthor && isActive
  const isShowBlockUserButton = !isCommentAuthor
  const isShowCollapseButton =
    isArticleAuthor && !isCommentAuthor && (isActive || isCollapsed)

  if (
    (!isShowPinButton &&
      !isShowEditButton &&
      !isShowDeleteButton &&
      !isShowBlockUserButton &&
      !isShowCollapseButton) ||
    viewer.isInactive
  ) {
    return null
  }

  return (
    <Dropdown
      content={
        <Menu width="sm">
          {isShowPinButton && (
            <PinButton comment={comment} hideDropdown={hideDropdown} />
          )}
          {isShowEditButton && editComment && (
            <EditButton hideDropdown={hideDropdown} editComment={editComment} />
          )}
          {/* {!isCommentAuthor && isActive && (
              <ReportButton commentId={comment.id} hideDropdown={hideDropdown} />
          )} */}
          {isShowDeleteButton && (
            <DeleteButton commentId={comment.id} hideDropdown={hideDropdown} />
          )}
          {isShowBlockUserButton && (
            <BlockUserButton
              user={comment.author}
              hideDropdown={hideDropdown}
            />
          )}
          {isShowCollapseButton && (
            <CollapseButton comment={comment} hideDropdown={hideDropdown} />
          )}
        </Menu>
      }
      trigger="click"
      onCreate={setInstance}
      placement="bottom-end"
    >
      <Button
        spacing={['xtight', 'xtight']}
        bgHoverColor="grey-lighter"
        compensation="right"
        aria-label="更多操作"
        aria-haspopup="true"
      >
        <Icon.More color="grey" />
      </Button>
    </Dropdown>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
