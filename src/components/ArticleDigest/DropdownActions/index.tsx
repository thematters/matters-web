import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, IconColor, Menu, PopperInstance } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import ArchiveButton from './ArchiveButton'
import ExtendButton from './ExtendButton'
import RemoveTagButton from './RemoveTagButton'
import StickyButton from './StickyButton'
import styles from './styles.css'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'

export interface DropdownActionsControls {
  color?: IconColor
  inTagDetail?: boolean
  inUserArticles?: boolean
}

type DropdownActionsProps = {
  article: DropdownActionsArticle
} & DropdownActionsControls

interface DropdownContentProps {
  article: DropdownActionsArticle

  instance?: PopperInstance | null
  hideDropdown: () => void

  hasStickyButton?: boolean
  hasArchiveButton?: boolean
  hasRemoveTagButton?: boolean
}

const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...ArchiveButtonArticle
      ...StickyButtonArticle
      ...ExtendButtonArticle
    }
    ${StickyButton.fragments.article}
    ${ArchiveButton.fragments.article}
    ${ExtendButton.fragments.article}
  `
}

const DropdownContent = ({
  article,

  instance,
  hideDropdown,

  hasStickyButton,
  hasArchiveButton,
  hasRemoveTagButton
}: DropdownContentProps) => {
  return (
    <Menu>
      {/* public */}
      <Menu.Item>
        <ExtendButton article={article} hideDropdown={hideDropdown} />
      </Menu.Item>

      {/* private */}
      {hasStickyButton && (
        <Menu.Item>
          <StickyButton article={article} hideDropdown={hideDropdown} />
        </Menu.Item>
      )}
      {hasArchiveButton && (
        <Menu.Item>
          <ArchiveButton article={article} hideDropdown={hideDropdown} />
        </Menu.Item>
      )}
      {hasRemoveTagButton && (
        <Menu.Item>
          <RemoveTagButton
            article={article}
            hideDropdown={hideDropdown}
            instance={instance}
          />
        </Menu.Item>
      )}
    </Menu>
  )
}

const DropdownActions = ({
  article,

  color = 'grey',
  inTagDetail,
  inUserArticles
}: DropdownActionsProps) => {
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
  const isActive = article.articleState === 'active'
  const hasRemoveTagButton = inTagDetail && isMattyUser
  const hasStickyButton =
    inUserArticles && isArticleAuthor && isActive && !viewer.isInactive
  const hasArchiveButton = isArticleAuthor && isActive && !viewer.isInactive

  return (
    <>
      <Dropdown
        content={
          <DropdownContent
            article={article}
            instance={instance}
            hideDropdown={hideDropdown}
            hasStickyButton={hasStickyButton}
            hasArchiveButton={hasArchiveButton}
            hasRemoveTagButton={hasRemoveTagButton}
          />
        }
        trigger="click"
        onCreate={setInstance}
        placement="bottom-end"
        zIndex={301}
      >
        <button
          type="button"
          aria-label="更多操作"
          aria-haspopup="true"
          onClick={e => e.stopPropagation()}
        >
          <Icon.MoreSmall color={color} />
        </button>
      </Dropdown>

      <style jsx>{styles}</style>
    </>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
