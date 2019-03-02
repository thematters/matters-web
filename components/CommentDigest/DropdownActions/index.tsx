import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import ICON_MORE_SMALL from '~/static/icons/more-small.svg?sprite'

import { DropdownActionsComment } from './__generated__/DropdownActionsComment'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import PinButton from './PinButton'
import ReportButton from './ReportButton'

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
}> = ({ comment, hideDropdown }) => {
  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === comment.article.author.id
  const isCommentAuthor = viewer.id === comment.author.id

  return (
    <Menu>
      {isArticleAuthor && (
        <Menu.Item>
          <PinButton comment={comment} hideDropdown={hideDropdown} />
        </Menu.Item>
      )}
      {isCommentAuthor && (
        <Menu.Item>
          <EditButton commentId={comment.id} hideDropdown={hideDropdown} />
        </Menu.Item>
      )}
      {!isCommentAuthor && (
        <Menu.Item>
          <ReportButton commentId={comment.id} hideDropdown={hideDropdown} />
        </Menu.Item>
      )}
      {isCommentAuthor && (
        <Menu.Item>
          <DeleteButton commentId={comment.id} hideDropdown={hideDropdown} />
        </Menu.Item>
      )}
    </Menu>
  )
}

const DropdownActions = ({ comment }: { comment: DropdownActionsComment }) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  return (
    <Dropdown
      content={
        <DropdownContent comment={comment} hideDropdown={hideDropdown} />
      }
      trigger="click"
      onCreate={i => setInstance(i)}
      placement="right-start"
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
