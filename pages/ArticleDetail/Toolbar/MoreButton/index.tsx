import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import ICON_MORE_REGULAR from '~/static/icons/more-regular.svg?sprite'

import { MoreButtonArticle } from './__generated__/MoreButtonArticle'
import ArchiveButton from './ArchiveButton'

const fragments = {
  article: gql`
    fragment MoreButtonArticle on Article {
      id
      author {
        id
      }
      state
    }
  `
}

const DropdownContent: React.FC<{
  article: MoreButtonArticle
  hideDropdown: () => void
  editComment?: () => void
}> = ({ article, hideDropdown }) => {
  const viewer = useContext(ViewerContext)
  const isArchived = article.state === 'archived'
  const isArticleAuthor = viewer.id === article.author.id

  return (
    <Menu>
      <Menu.Item>
        {!isArchived && isArticleAuthor && (
          <ArchiveButton articleId={article.id} hideDropdown={hideDropdown} />
        )}
      </Menu.Item>
    </Menu>
  )
}

const MoreButton = ({ article }: { article: MoreButtonArticle }) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  /**
   * REMOVE this after implement report article
   */
  const viewer = useContext(ViewerContext)
  const isArchived = article.state === 'archived'
  const isArticleAuthor = viewer.id === article.author.id
  if (isArchived || !isArticleAuthor) {
    return null
  }

  return (
    <Dropdown
      content={
        <DropdownContent article={article} hideDropdown={hideDropdown} />
      }
      trigger="click"
      onCreate={i => setInstance(i)}
      placement="bottom-end"
      zIndex={301}
    >
      <button type="button" aria-label="更多操作">
        <Icon
          size="default"
          id={ICON_MORE_REGULAR.id}
          viewBox={ICON_MORE_REGULAR.viewBox}
        />
      </button>
    </Dropdown>
  )
}

MoreButton.fragments = fragments

export default MoreButton
