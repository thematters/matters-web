import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
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
  `
}

const DropdownContent: React.FC<{
  comment: DropdownActionsComment
  hideDropdown: () => void
  editComment?: () => void
  refetch?: boolean
}> = ({ comment, editComment, hideDropdown, refetch }) => {
  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === comment.article.author.id
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'

  return (
    <Menu>
      {isArticleAuthor && isActive && (
        <Menu.Item>
          <PinButton
            comment={comment}
            hideDropdown={hideDropdown}
            refetch={refetch}
          />
        </Menu.Item>
      )}
      {isCommentAuthor && editComment && isActive && (
        <Menu.Item>
          <EditButton hideDropdown={hideDropdown} editComment={editComment} />
        </Menu.Item>
      )}
      {/* {!isCommentAuthor && isActive && (
        <Menu.Item>
          <ReportButton commentId={comment.id} hideDropdown={hideDropdown} />
        </Menu.Item>
      )} */}
      {isCommentAuthor && isActive && (
        <Menu.Item>
          <DeleteButton commentId={comment.id} hideDropdown={hideDropdown} />
        </Menu.Item>
      )}
    </Menu>
  )
}

const DropdownActions = ({
  comment,
  editComment,
  refetch
}: {
  comment: DropdownActionsComment
  editComment?: () => void
  refetch?: boolean
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
  if (
    (!isCommentAuthor && !isArticleAuthor) ||
    !isActive ||
    viewer.isInactive
  ) {
    return null
  }

  return (
    <Dropdown
      content={
        <DropdownContent
          comment={comment}
          hideDropdown={hideDropdown}
          editComment={editComment}
          refetch={refetch}
        />
      }
      trigger="click"
      onCreate={setInstance}
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
