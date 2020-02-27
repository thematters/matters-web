import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
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

interface Controls {
  hasExtendButton: boolean
  hasRemoveTagButton: boolean
  hasStickyButton: boolean
  hasArchiveButton: boolean
}

interface DialogProps {
  openArchiveDialog?: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

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

const BaseDropdownActions = ({
  article,
  color = 'grey',
  size,
  hasExtendButton,
  hasStickyButton,
  hasArchiveButton,
  hasRemoveTagButton,
  inTagDetailLatest,
  inTagDetailSelected,
  openArchiveDialog
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {/* public */}
      {hasExtendButton && <ExtendButton article={article} />}

      {/* private */}
      {hasStickyButton && <StickyButton article={article} />}
      {hasArchiveButton && openArchiveDialog && (
        <ArchiveArticle.Button openDialog={openArchiveDialog} />
      )}
      {inTagDetailLatest && <SetTagSelectedButton article={article} />}
      {inTagDetailSelected && <SetTagUnselectedButton article={article} />}
      {hasRemoveTagButton && <RemoveTagButton article={article} />}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end'
      }}
      dialog={{
        content: <Content />,
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
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const {
    article,
    inUserArticles,
    inTagDetailLatest,
    inTagDetailSelected
  } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isMattyUser = viewer.isAdmin && viewer.info.email === 'hi@matters.news'
  const isActive = article.articleState === 'active'
  const isInTagDetail = inTagDetailLatest || inTagDetailSelected

  const controls = {
    hasExtendButton: !!isActive,
    hasRemoveTagButton: !!(isInTagDetail && isMattyUser),
    hasStickyButton: !!(
      inUserArticles &&
      !isInTagDetail &&
      isArticleAuthor &&
      isActive &&
      !viewer.isInactive
    ),
    hasArchiveButton:
      isArticleAuthor && !isInTagDetail && isActive && !viewer.isInactive
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  if (controls.hasArchiveButton) {
    return (
      <ArchiveArticle.Dialog article={article}>
        {({ open: openArchiveDialog }) => (
          <BaseDropdownActions
            {...props}
            {...controls}
            openArchiveDialog={openArchiveDialog}
          />
        )}
      </ArchiveArticle.Dialog>
    )
  }

  return <BaseDropdownActions {...props} {...controls} />
}

DropdownActions.fragments = fragments

export default DropdownActions
