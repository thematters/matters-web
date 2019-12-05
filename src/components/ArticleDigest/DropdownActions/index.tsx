import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import ICON_MORE_SMALL from '~/static/icons/more-small.svg?sprite'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'
import { FolloweeDropdownActionsArticle } from './__generated__/FolloweeDropdownActionsArticle'
import ArchiveButton from './ArchiveButton'
import RemoveTagButton from './RemoveTagButton'
import StickyButton from './StickyButton'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...ArchiveButtonArticle
      ...StickyButtonArticle
    }
    ${StickyButton.fragments.article}
    ${ArchiveButton.fragments.article}
  `,
  followee: gql`
    fragment FolloweeDropdownActionsArticle on Article {
      id
      ...FolloweeArchiveButtonArticle
      ...StickyButtonArticle
    }
    ${StickyButton.fragments.article}
    ${ArchiveButton.fragments.followee}
  `
}

const isActive = (article: any): boolean => {
  if (article.hasOwnProperty('state')) {
    return article.state === 'active'
  }
  if (article.hasOwnProperty('articleState')) {
    return article.articleState === 'active'
  }
  return false
}

const DropdownContent: React.FC<{
  article: DropdownActionsArticle | FolloweeDropdownActionsArticle
  instance?: PopperInstance | null
  hideDropdown: () => void
  inTagDetail?: boolean
}> = ({ article, instance, hideDropdown, inTagDetail }) => {
  return (
    <Menu>
      {inTagDetail ? (
        <Menu.Item>
          <RemoveTagButton article={article} hideDropdown={hideDropdown} instance={instance}/>
        </Menu.Item>
      ) : (
        <>
          <Menu.Item>
            <StickyButton article={article} hideDropdown={hideDropdown} />
          </Menu.Item>
          <Menu.Item>
            <ArchiveButton article={article} hideDropdown={hideDropdown} />
          </Menu.Item>
        </>
      )}
    </Menu>
  )
}

const DropdownActions = ({
  article,
  inTagDetail = false
}: {
  article: DropdownActionsArticle | FolloweeDropdownActionsArticle
  inTagDetail?: boolean
}) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === article.author.id
  const isMattyUser = viewer.isAdmin && viewer.info.email === 'hi@matters.news'

  if (
    (inTagDetail && !isMattyUser) ||
    (!inTagDetail && (!isArticleAuthor || !isActive(article) || viewer.isInactive))
  ) {
    return null
  }

  return (
    <>
      <Dropdown
        content={
          <DropdownContent
            article={article}
            instance={instance}
            hideDropdown={hideDropdown}
            inTagDetail={inTagDetail}
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
            color="grey"
          />
        </button>
      </Dropdown>

      <style jsx>{styles}</style>
    </>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
