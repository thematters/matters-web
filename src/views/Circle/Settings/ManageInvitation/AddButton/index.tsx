import { FormattedMessage } from 'react-intl'

import { Button, TextIcon } from '~/components'

import AddInvitationDialog from '../AddInvitationDialog'

/**
 * This button component is for adding new circle invitations.
 *
 * Usage:
 *
 * ```tsx
 *   <CircleInvitationAddButton />
 * ```
 */
const CircleInvitationAddButton = () => {
  return (
    <AddInvitationDialog>
      {({ openDialog }) => (
        <Button
          size={['6rem', '2rem']}
          bgColor={'green'}
          onClick={openDialog}
          aria-haspopup="dialog"
        >
          <TextIcon color="white" size="mdS" weight="md">
            <FormattedMessage
              defaultMessage="Add Invitation"
              id="b8ogKp"
              description="src/views/Circle/Settings/ManageInvitation/AddButton/index.tsx"
            />
          </TextIcon>
        </Button>
      )}
    </AddInvitationDialog>
  )
}

export default CircleInvitationAddButton
