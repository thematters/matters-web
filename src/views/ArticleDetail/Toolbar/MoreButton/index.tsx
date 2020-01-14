import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import ArchiveButton from '~/components/ArticleDigest/DropdownActions/ArchiveButton'
import { ViewerContext } from '~/components/Viewer'

import { MoreButtonArticle } from './__generated__/MoreButtonArticle'

const fragments = {
  article: gql`
    fragment MoreButtonArticle on Article {
      id
      ...ArchiveButtonArticle
    }
    ${ArchiveButton.fragments.article}
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
          <ArchiveButton article={article} hideDropdown={hideDropdown} />
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
      onCreate={setInstance}
      placement="bottom-end"
    >
      <button type="button" aria-label="更多操作" aria-haspopup="true">
        <Icon.MoreRegular size="md" />
      </button>
    </Dropdown>
  )
}

MoreButton.fragments = fragments

export default MoreButton
