import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import BlockUserButton from '~/components/Button/BlockUser/Dropdown'
import { ViewerContext } from '~/components/Viewer'

import ICON_MORE_SMALL from '~/static/icons/more-small.svg?sprite'

import { DropdownActionsComment } from './__generated__/DropdownActionsComment'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import PinButton from './PinButton'
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
    }
    ${PinButton.fragments.comment}
    ${BlockUserButton.fragments.user}
  `
}

const DropdownActions = ({
  comment,
  editComment
}: {
  comment: DropdownActionsComment
  editComment?: () => void
}) => {
  const [shown, setShown] = useState(false)
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
  const isDescendantComment = comment.parentComment

  const isShowPinButton = isArticleAuthor && isActive && !isDescendantComment
  const isShowEditButton = isCommentAuthor && !!editComment && isActive
  const isShowDeleteButton = isCommentAuthor && isActive
  const isShowBlockUserButton = !isCommentAuthor

  if (
    (!isShowPinButton &&
      !isShowEditButton &&
      !isShowDeleteButton &&
      !isShowBlockUserButton) ||
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
                isShown={shown}
                hideDropdown={hideDropdown}
              />
            </Menu.Item>
          )}
        </Menu>
      }
      trigger="click"
      onCreate={setInstance}
      onShown={() => setShown(true)}
      placement="bottom-end"
      zIndex={301}
    >
      <button type="button" aria-label="更多操作">
        <Icon
          size="small"
          id={ICON_MORE_SMALL.id}
          viewBox={ICON_MORE_SMALL.viewBox}
        />
      </button>
    </Dropdown>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
