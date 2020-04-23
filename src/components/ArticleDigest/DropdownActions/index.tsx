import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  AppreciatorsDialog,
  Button,
  DropdownDialog,
  FingerprintDialog,
  Icon,
  IconColor,
  IconSize,
  Menu,
  ViewerContext,
} from '~/components'

import { TEXT } from '~/common/enums'

import AppreciatorsButton from './AppreciatorsButton'
import ArchiveArticle from './ArchiveArticle'
import ExtendButton from './ExtendButton'
import FingerprintButton from './FingerprintButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import StickyButton from './StickyButton'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'

export interface DropdownActionsControls {
  color?: IconColor
  size?: IconSize
  inCard?: boolean
  inUserArticles?: boolean
  inTagDetailLatest?: boolean
  inTagDetailSelected?: boolean
}

type DropdownActionsProps = {
  article: DropdownActionsArticle
} & DropdownActionsControls

interface Controls {
  hasAppreciators: boolean
  hasFingerprint: boolean
  hasExtend: boolean
  hasSticky: boolean
  hasArchive: boolean
  hasSetTagSelected: boolean
  hasSetTagUnSelected: boolean
  hasRemoveTag: boolean
}

interface DialogProps {
  openFingerprintDialog: () => void
  openAppreciatorsDialog: () => void
  openArchiveDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...AppreciatorsDialogArticle
      ...FingerprintArticle
      ...ArchiveArticleArticle
      ...StickyButtonArticle
      ...ExtendButtonArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${FingerprintDialog.fragments.article}
    ${StickyButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
  `,
}

const BaseDropdownActions = ({
  article,
  color = 'grey',
  size,
  inCard,

  hasAppreciators,
  hasFingerprint,
  hasExtend,
  hasSticky,
  hasArchive,
  hasSetTagSelected,
  hasSetTagUnSelected,
  hasRemoveTag,

  openFingerprintDialog,
  openAppreciatorsDialog,
  openArchiveDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {/* public */}
      {hasAppreciators && (
        <AppreciatorsButton openDialog={openAppreciatorsDialog} />
      )}
      {hasFingerprint && (
        <FingerprintButton openDialog={openFingerprintDialog} />
      )}
      {hasExtend && <ExtendButton article={article} />}

      {/* private */}
      {(hasSticky ||
        hasArchive ||
        hasSetTagSelected ||
        hasSetTagUnSelected ||
        hasRemoveTag) && <Menu.Divider spacing="xtight" />}
      {hasSticky && <StickyButton article={article} />}
      {hasArchive && <ArchiveArticle.Button openDialog={openArchiveDialog} />}
      {hasSetTagSelected && <SetTagSelectedButton article={article} />}
      {hasSetTagUnSelected && <SetTagUnselectedButton article={article} />}
      {hasRemoveTag && <RemoveTagButton article={article} />}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ open, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
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
    inTagDetailSelected,
  } = props
  const viewer = useContext(ViewerContext)

  const isArticleAuthor = viewer.id === article.author.id
  const isMattyUser = viewer.isAdmin && viewer.info.email === 'hi@matters.news'
  const isActive = article.articleState === 'active'
  const isInTagDetail = inTagDetailLatest || inTagDetailSelected

  const controls = {
    hasAppreciators: article.appreciationsReceived.totalCount > 0,
    hasFingerprint: isActive || isArticleAuthor,
    hasExtend: !!isActive,
    hasSticky: !!(
      inUserArticles &&
      isArticleAuthor &&
      isActive &&
      !viewer.isInactive
    ),
    hasArchive: isArticleAuthor && isActive && !viewer.isArchived,
    hasSetTagSelected: !!(inTagDetailLatest && isMattyUser),
    hasSetTagUnSelected: !!(inTagDetailSelected && isMattyUser),
    hasRemoveTag: !!(isInTagDetail && isMattyUser),
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <FingerprintDialog article={article}>
      {({ open: openFingerprintDialog }) => (
        <AppreciatorsDialog article={article}>
          {({ open: openAppreciatorsDialog }) => (
            <ArchiveArticle.Dialog article={article}>
              {({ open: openArchiveDialog }) => (
                <BaseDropdownActions
                  {...props}
                  {...controls}
                  openFingerprintDialog={openFingerprintDialog}
                  openAppreciatorsDialog={openAppreciatorsDialog}
                  openArchiveDialog={openArchiveDialog}
                />
              )}
            </ArchiveArticle.Dialog>
          )}
        </AppreciatorsDialog>
      )}
    </FingerprintDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
