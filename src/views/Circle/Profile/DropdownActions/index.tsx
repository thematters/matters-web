import {
  Button,
  DropdownDialog,
  IconMore32,
  IconShare16,
  Menu,
  ShareDialog,
  TextIcon,
  Translate,
} from '~/components'

import { TEXT } from '~/common/enums'

interface DialogProps {
  openShareDialog: () => void
}

type BaseDropdownActionsProps = DialogProps

const BaseDropdownActions = ({ openShareDialog }: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<IconShare16 size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享圍爐" zh_hans="分享围炉" />
        </TextIcon>
      </Menu.Item>
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

const DropdownActions = () => {
  return (
    <ShareDialog>
      {({ open: openShareDialog }) => (
        <BaseDropdownActions openShareDialog={openShareDialog} />
      )}
    </ShareDialog>
  )
}

export default DropdownActions
