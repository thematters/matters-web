import { Dialog, Translate } from '~/components'

interface Props {
  closeDialog: () => void
}

const InvitationSentTitle = (
  <Translate
    zh_hant="成功發送邀請"
    zh_hans="成功发送邀请"
    en="Invitation Sent"
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
        <Translate
          zh_hant="你已寄出邀請給朋友們快去已邀請管理查看他們加入的進度吧！"
          zh_hans="你已寄出邀请给朋友们快去已邀请管理查看他们加入的进度吧！"
          en="Invitations have been sent. You can check invitation status on the invitation management page."
        />
      </p>
    </Dialog.Message>

    <Dialog.Footer>
      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={closeDialog}
      >
        <Translate id="understood" />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default InvitationSent
