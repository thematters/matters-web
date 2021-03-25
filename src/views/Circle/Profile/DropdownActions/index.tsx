import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAdd24,
  IconLogout24,
  IconMore32,
  IconShare16,
  Menu,
  ShareDialog,
  TextIcon,
  Translate,
  UnsubscribeCircleDialog,
  useFeatures,
  ViewerContext,
} from '~/components'

import { TEXT } from '~/common/enums'

import { AddCircleArticleDialog } from './AddCircleArticleDialog'
import { fragments } from './gql'

import { DropdownActionsCirclePrivate } from './__generated__/DropdownActionsCirclePrivate'
import { DropdownActionsCirclePublic } from './__generated__/DropdownActionsCirclePublic'

interface DialogProps {
  openAddCircleArticlesDialog: () => void
  openShareDialog: () => void
  openUnsubscribeCircleDialog: () => void
}

type DropdownActionsProps = {
  circle: DropdownActionsCirclePublic & Partial<DropdownActionsCirclePrivate>
}

interface Controls {
  hasAddArticles: boolean
  hasUnsubscribeCircle: boolean
}

type BaseDropdownActionsProps = DialogProps & Controls

const BaseDropdownActions = ({
  hasAddArticles,
  hasUnsubscribeCircle,

  openAddCircleArticlesDialog,
  openShareDialog,
  openUnsubscribeCircleDialog,
}: BaseDropdownActionsProps) => {
  const features = useFeatures()

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<IconShare16 size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享圍爐" zh_hans="分享围炉" />
        </TextIcon>
      </Menu.Item>

      {hasAddArticles && features.circle_management && (
        <Menu.Item onClick={openAddCircleArticlesDialog}>
          <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
            <Translate id="addArticles" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasUnsubscribeCircle && (
        <Menu.Item onClick={openUnsubscribeCircleDialog}>
          <TextIcon icon={<IconLogout24 size="md" />} size="md" spacing="base">
            <Translate id="unsubscribeCircle" />
          </TextIcon>
        </Menu.Item>
      )}
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
          bgColor="half-black"
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <IconMore32 size="lg" color="white" />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = ({ circle }: DropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const isOwner = circle.owner.id === viewer.id
  const isMember = !!circle.isMember
  const controls = {
    hasAddArticles: isOwner,
    hasUnsubscribeCircle: isMember,
  }

  return (
    <AddCircleArticleDialog circle={circle}>
      {({ open: openAddCircleArticlesDialog }) => (
        <ShareDialog>
          {({ open: openShareDialog }) => (
            <UnsubscribeCircleDialog id={circle.id}>
              {({ open: openUnsubscribeCircleDialog }) => (
                <BaseDropdownActions
                  {...controls}
                  openAddCircleArticlesDialog={openAddCircleArticlesDialog}
                  openShareDialog={openShareDialog}
                  openUnsubscribeCircleDialog={openUnsubscribeCircleDialog}
                />
              )}
            </UnsubscribeCircleDialog>
          )}
        </ShareDialog>
      )}
    </AddCircleArticleDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
