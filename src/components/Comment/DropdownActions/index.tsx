import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
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
        <Menu>
          {isShowPinButton && (
            <Menu.Item>
              <PinButton comment={comment} hideDropdown={hideDropdown} />
            </Menu.Item>
          )}
          {isShowEditButton && editComment && (
            <Menu.Item>
              <EditButton
                hideDropdown={hideDropdown}
                editComment={editComment}
              />
            </Menu.Item>
          )}
          {/* {!isCommentAuthor && isActive && (
            <Menu.Item>
              <ReportButton commentId={comment.id} hideDropdown={hideDropdown} />
            </Menu.Item>
          )} */}
          {isShowDeleteButton && (
            <Menu.Item>
              <DeleteButton
                commentId={comment.id}
                hideDropdown={hideDropdown}
              />
            </Menu.Item>
          )}
          {isShowBlockUserButton && (
            <Menu.Item>
              <BlockUserButton
                user={comment.author}
                hideDropdown={hideDropdown}
              />
            </Menu.Item>
          )}
          {isShowCollapseButton && (
            <Menu.Item>
              <CollapseButton comment={comment} hideDropdown={hideDropdown} />
            </Menu.Item>
          )}
        </Menu>
      }
      trigger="click"
      onCreate={setInstance}
      placement="bottom-end"
      zIndex={301}
    >
      <button type="button" aria-label="更多操作">
        <Icon.MoreSmall color="grey" />
      </button>
    </Dropdown>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
