import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  Icon,
  IconColor,
  IconSize,
  Menu,
  Translate,
  ViewerContext
} from '~/components'

import { TEXT } from '~/common/enums'

import ArchiveArticle from './ArchiveArticle'
import ExtendButton from './ExtendButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import StickyButton from './StickyButton'

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

const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...ArchiveArticleArticle
      ...StickyButtonArticle
      ...ExtendButtonArticle
    }
    ${StickyButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
  `
}

const DropdownActions = ({
  article,

  color = 'grey',
  size,
  inUserArticles,
  inTagDetailLatest,
  inTagDetailSelected
}: DropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === article.author.id
  const isMattyUser = viewer.isAdmin && viewer.info.email === 'hi@matters.news'
  const isActive = article.articleState === 'active'
  const isInTagDetail = inTagDetailLatest || inTagDetailSelected
  const hasExtendButton = isActive
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

  const Content = ({
    isInDropdown,
    showArchiveDialog
  }: {
    isInDropdown?: boolean
    showArchiveDialog: () => void
  }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {/* public */}
      {hasExtendButton && <ExtendButton article={article} />}

      {/* private */}
      {hasStickyButton && <StickyButton article={article} />}
      {hasArchiveButton && (
        <ArchiveArticle.Button showDialog={showArchiveDialog} />
      )}
      {inTagDetailLatest && <SetTagSelectedButton article={article} />}
      {inTagDetailSelected && <SetTagUnselectedButton article={article} />}
      {hasRemoveTagButton && <RemoveTagButton article={article} />}
    </Menu>
  )

  return (
    <ArchiveArticle.Dialog article={article}>
      {({ open: showArchiveDialog }) => (
        <DropdownDialog
          dropdown={{
            content: (
              <Content isInDropdown showArchiveDialog={showArchiveDialog} />
            ),
            placement: 'bottom-end'
          }}
          dialog={{
            content: <Content showArchiveDialog={showArchiveDialog} />,
            title: <Translate id="moreActions" />
          }}
        >
          {({ open, ref }) => (
            <Button
              spacing={['xtight', 'xtight']}
              bgHoverColor="grey-lighter"
              aria-label={TEXT.zh_hant.moreActions}
              aria-haspopup="true"
              onClick={open}
              ref={ref}
            >
              <Icon.More color={color} size={size} />
            </Button>
          )}
        </DropdownDialog>
      )}
    </ArchiveArticle.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
