import {
  Dropdown,
  Form,
  IconUnlock24,
  Menu,
  ResetPaymentPasswordDialog,
  TextIcon,
  Translate,
} from '~/components'

interface PaymentPasswordProps {
  openResetPaymentPasswordDialog: () => void
}

const BasePaymentPassword: React.FC<PaymentPasswordProps> = ({
  openResetPaymentPasswordDialog,
}) => {
  const Content = () => (
    <Menu width="sm">
      <Menu.Item onClick={openResetPaymentPasswordDialog} ariaHasPopup="dialog">
        <TextIcon icon={<IconUnlock24 size="md" />} size="md" spacing="base">
          <Translate id="resetPaymentPassword" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ ref }) => (
        <Form.List.Item
          title={
            <Translate
              zh_hant="管理交易密碼"
              zh_hans="管理交易密码"
              en="Payment Password"
            />
          }
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
