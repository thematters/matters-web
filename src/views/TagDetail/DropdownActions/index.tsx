import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconEdit,
  IconMoreLarge,
  IconRemoveMedium,
  IconShare,
  Menu,
  ShareDialog,
  TagDialog,
  TagDialogProps,
  TagLeaveDialog,
  TextIcon,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, TEXT } from '~/common/enums'

type DropdownActionsProps = {
  isMaintainer: boolean
  isOwner: boolean
} & TagDialogProps

interface DialogProps {
  openShareDialog: () => void
  openTagDialog: () => void
  openTagLeaveDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  isMaintainer,
  isOwner,
  openShareDialog,
  openTagDialog,
  openTagLeaveDialog,
}: BaseDropdownActionsProps) => {
  const isSmallUp = useResponsive('sm-up')

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<IconShare size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享標籤" zh_hans="分享标签" />
        </TextIcon>
      </Menu.Item>

      {isMaintainer && (
        <Menu.Item onClick={openTagDialog}>
          <TextIcon icon={<IconEdit size="md" />} size="md" spacing="base">
            <Translate id="editTag" />
          </TextIcon>
        </Menu.Item>
      )}

      {isOwner && (
        <Menu.Item onClick={openTagLeaveDialog}>
          <TextIcon
            icon={<IconRemoveMedium size="md" />}
            color="red"
            size="md"
            spacing="base"
          >
            <Translate zh_hant="離開標籤" zh_hans="离开标签" />
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
          bgColor={isSmallUp ? 'green-lighter' : 'half-black'}
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <IconMoreLarge size="lg" color={isSmallUp ? 'green' : 'white'} />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
    return
  }

  return (
    <ShareDialog title={props.content}>
      {({ open: openShareDialog }) => (
        <TagDialog {...props}>
          {({ open: openTagDialog }) => (
            <TagLeaveDialog {...props}>
              {({ open: openTagLeaveDialog }) => (
                <BaseDropdownActions
                  {...props}
                  openShareDialog={openShareDialog}
                  openTagDialog={viewer.isFrozen ? forbid : openTagDialog}
                  openTagLeaveDialog={
                    viewer.isFrozen ? forbid : openTagLeaveDialog
                  }
                />
              )}
            </TagLeaveDialog>
          )}
        </TagDialog>
      )}
    </ShareDialog>
  )
}

export default DropdownActions
