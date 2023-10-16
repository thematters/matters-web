import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'

interface Props {
  closeDialog: () => void
}

const InvitationSentTitle = (
  <FormattedMessage
    defaultMessage="Invitation Sent"
    id="OIj8pQ"
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
    <Dialog.Header title={InvitationSentTitle} />

    <Dialog.Message>
      <h3>{InvitationSentTitle}</h3>
      <p>
        <FormattedMessage
          defaultMessage="Invitations have been sent. You can check invitation status on the invitation management page."
          id="SdXoXI"
          description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/Sent.tsx"
        />
      </p>
    </Dialog.Message>

    <Dialog.Footer
      btns={
        <Dialog.RoundedButton
          text={<FormattedMessage defaultMessage="I see" id="lIir/P" />}
          onClick={closeDialog}
        />
      }
      smUpBtns={
        <Dialog.TextButton
          text={<FormattedMessage defaultMessage="I see" id="lIir/P" />}
          onClick={closeDialog}
        />
      }
    />
  </>
)

export default InvitationSent
