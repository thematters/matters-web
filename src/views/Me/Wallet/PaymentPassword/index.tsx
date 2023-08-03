import {
  Dropdown,
  Form,
  IconUnlock24,
  Menu,
  ResetPaymentPasswordDialog,
  Translate,
} from '~/components'

interface PaymentPasswordProps {
  openResetPaymentPasswordDialog: () => void
}

const BasePaymentPassword: React.FC<PaymentPasswordProps> = ({
  openResetPaymentPasswordDialog,
}) => {
  const Content = () => (
    <Menu>
      <Menu.Item
        text={<Translate id="resetPaymentPassword" />}
        icon={<IconUnlock24 size="mdS" />}
        onClick={openResetPaymentPasswordDialog}
        ariaHasPopup="dialog"
      />
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Form.List.Item
          title={
            <Translate
              zh_hant="管理交易密碼"
              zh_hans="管理交易密码"
              en="Payment Password"
            />
          }
          onClick={openDropdown}
          role="button"
          ariaHasPopup="listbox"
          ref={ref}
        />
      )}
    </Dropdown>
  )
}

const PaymentPassword = () => (
  <ResetPaymentPasswordDialog>
    {({ openDialog: openResetPaymentPasswordDialog }) => (
      <BasePaymentPassword
        openResetPaymentPasswordDialog={openResetPaymentPasswordDialog}
      />
    )}
  </ResetPaymentPasswordDialog>
)

export default PaymentPassword
