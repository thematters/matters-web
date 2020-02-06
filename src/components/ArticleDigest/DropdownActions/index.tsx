import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import {
  Button,
  Dropdown,
  Icon,
  IconColor,
  IconSize,
  Menu,
  PopperInstance
} from '~/components'
import { ViewerContext } from '~/components/Viewer'

import ArchiveButton from './ArchiveButton'
import ExtendButton from './ExtendButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import StickyButton from './StickyButton'
import styles from './styles.css'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'

export interface DropdownActionsControls {
  color?: IconColor
  size?: IconSize
  inUserArticles?: boolean
  inTagDetailLatest?: boolean
  inTagDetailSelected?: boolean
}

type DropdownActionsProps = {
  article: DropdownActionsArticle
} & DropdownActionsControls

interface DropdownContentProps {
  article: DropdownActionsArticle

  instance?: PopperInstance | null

  hasExtendButton?: boolean
  hasStickyButton?: boolean
  hasArchiveButton?: boolean
  hasRemoveTagButton?: boolean
  hasSetTagSelectedButton?: boolean
  hasSetTagUnselectedButton?: boolean
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

  hasExtendButton,
  hasStickyButton,
  hasArchiveButton,
  hasRemoveTagButton,
  hasSetTagSelectedButton,
  hasSetTagUnselectedButton
}: DropdownContentProps) => {
  return (
    <Menu width="sm">
      {/* public */}
      {hasExtendButton && <ExtendButton article={article} />}

      {/* private */}
      {hasStickyButton && <StickyButton article={article} />}
      {hasArchiveButton && <ArchiveButton article={article} />}
      {hasSetTagSelectedButton && (
        <SetTagSelectedButton article={article} instance={instance} />
      )}
      {hasSetTagUnselectedButton && (
        <SetTagUnselectedButton article={article} />
      )}
      {hasRemoveTagButton && (
        <RemoveTagButton article={article} instance={instance} />
      )}
    </Menu>
  )
}

const DropdownActions = ({
  article,

  color = 'grey',
  size,
  inUserArticles,
  inTagDetailLatest,
  inTagDetailSelected
}: DropdownActionsProps) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)

  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === article.author.id
  const isMattyUser = viewer.isAdmin && viewer.info.email === 'hi@matters.news'
  const isActive = article.articleState === 'active'
  const isInTagDetail = inTagDetailLatest || inTagDetailSelected
  const hasExtendButton = isActive && !isInTagDetail
  const hasRemoveTagButton = isInTagDetail && isMattyUser
  const hasStickyButton =
    inUserArticles &&
    !isInTagDetail &&
    isArticleAuthor &&
    isActive &&
    !viewer.isInactive
  const hasArchiveButton =
    isArticleAuthor && !isInTagDetail && isActive && !viewer.isInactive

  if (
    !hasExtendButton &&
    !hasRemoveTagButton &&
    !hasStickyButton &&
    !hasArchiveButton
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
            hasExtendButton={hasExtendButton}
            hasStickyButton={hasStickyButton}
            hasArchiveButton={hasArchiveButton}
            hasRemoveTagButton={hasRemoveTagButton}
            hasSetTagSelectedButton={inTagDetailLatest}
            hasSetTagUnselectedButton={inTagDetailSelected}
          />
        }
        onCreate={setInstance}
        placement="bottom-end"
      >
        <Button
          spacing={['xtight', 'xtight']}
          bgHoverColor="grey-lighter"
          aria-label="更多操作"
          aria-haspopup="true"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <Icon.More color={color} size={size} />
        </Button>
      </Dropdown>

      <style jsx>{styles}</style>
    </>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
