import { Dialog, Translate } from '~/components'

interface Props {
  close: () => void
}

const InvitationSent = ({ close }: Props) => (
  <>
    <Dialog.Header
      title={
        <Translate
          zh_hant="成功發送邀請"
          zh_hans="成功发送邀请"
          en="Invitation Sent"
        />
      }
      close={close}
      closeTextId="cancel"
      mode="hidden"
    />

    <Dialog.Message>
      <h3>
        <Translate
          zh_hant="成功發送邀請"
          zh_hans="成功发送邀请"
          en="Invitation Sent"
        />
      </h3>
      <p>
        <Translate
          zh_hant="你已寄出邀請給朋友們快去已邀請管理查看他們加入的進度吧！"
          zh_hans="你已寄出邀请给朋友们快去已邀请管理查看他们加入的进度吧！"
          en="Invitaions have been sent. You can check in invitation management page."
        />
      </p>
    </Dialog.Message>

    <Dialog.Footer>
      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={close}
      >
        <Translate id="understood" />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default InvitationSent
