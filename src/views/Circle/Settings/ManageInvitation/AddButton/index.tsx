import { Button, TextIcon, Translate } from '~/components'

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
          bgActiveColor="grey-lighter"
          onClick={openDialog}
        >
          <TextIcon color="green" size="md" weight="md">
            <Translate id="addCircleInvitation" />
          </TextIcon>
        </Button>
      )}
    </AddInvitationDialog>
  )
}

export default CircleInvitationAddButton
