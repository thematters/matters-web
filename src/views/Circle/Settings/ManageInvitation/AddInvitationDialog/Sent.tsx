import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'

interface Props {
  closeDialog: () => void
}

const InvitationSentTitle = (
  <FormattedMessage
    defaultMessage="Invitation Sent"
    description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/Sent.tsx"
  />
)

/**
 * This component shows sucessful message after sent invitations.
 *
 * Usage:
 *
 * ```tsx
 *   <InvitationSent closeDialog={closeDialog} />
 * ```
 */
const InvitationSent = ({ closeDialog }: Props) => (
  <>
    <Dialog.Header
      title={InvitationSentTitle}
      closeDialog={closeDialog}
      closeTextId="cancel"
      mode="hidden"
    />

    <Dialog.Message>
      <h3>{InvitationSentTitle}</h3>
      <p>
        <FormattedMessage
          defaultMessage="Invitations have been sent. You can check invitation status on the invitation management page."
          description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/Sent.tsx"
        />
      </p>
    </Dialog.Message>

    <Dialog.Footer>
      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={closeDialog}
      >
        <FormattedMessage defaultMessage="I see" description="" />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default InvitationSent
