import gql from 'graphql-tag'

import {
  Button,
  DropdownDialog,
  IconMoreLarge,
  IconShare,
  Menu,
  ShareDialog,
  TextIcon,
  Translate,
  useResponsive,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { TEXT } from '~/common/enums'

import { DropdownActionsUser } from './__generated__/DropdownActionsUser'

const fragments = {
  user: gql`
    fragment DropdownActionsUser on User {
      id
      ...BlockUser
    }
    ${BlockUser.fragments.user}
  `,
}

interface DropdownActionsProps {
  user: DropdownActionsUser
  isMe: boolean
}

interface DialogProps {
  openShareDialog: () => void
  openBlockUserDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  user,
  isMe,
  openShareDialog,
  openBlockUserDialog,
}: BaseDropdownActionsProps) => {
  const isSmallUp = useResponsive('sm-up')
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<IconShare size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享主頁" zh_hans="分享主页" />
        </TextIcon>
      </Menu.Item>

      {!isMe && (
        <BlockUser.Button user={user} openDialog={openBlockUserDialog} />
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

const DropdownActions = ({ user, isMe }: DropdownActionsProps) => {
  return (
    <ShareDialog>
      {({ open: openShareDialog }) => (
        <BlockUser.Dialog user={user}>
          {({ open: openBlockUserDialog }) => (
            <BaseDropdownActions
              user={user}
              isMe={isMe}
              openShareDialog={openShareDialog}
              openBlockUserDialog={openBlockUserDialog}
            />
          )}
        </BlockUser.Dialog>
      )}
    </ShareDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
