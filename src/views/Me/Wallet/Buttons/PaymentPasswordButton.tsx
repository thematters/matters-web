import {
  Dialog,
  DropdownDialog,
  Icon,
  Menu,
  ResetPaymentPasswordDialog,
  TextIcon,
  Translate,
} from '~/components'

interface PaymentPasswordButtonProps {
  openResetPaymentPasswordDialog: () => void
}

const BasePaymentPasswordButton: React.FC<PaymentPasswordButtonProps> = ({
  openResetPaymentPasswordDialog,
}) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openResetPaymentPasswordDialog}>
        <TextIcon
          icon={<Icon.UnlockMedium size="md" />}
          size="md"
          spacing="base"
        >
          <Translate id="resetPaymentPassword" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ open, ref }) => (
        <Dialog.Footer.Button
          bgColor="grey-lighter"
          textColor="black"
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <Translate id="paymentPassword" />
        </Dialog.Footer.Button>
      )}
    </DropdownDialog>
  )
}

export default () => (
  <ResetPaymentPasswordDialog>
    {({ open: openResetPaymentPasswordDialog }) => (
      <BasePaymentPasswordButton
        openResetPaymentPasswordDialog={openResetPaymentPasswordDialog}
      />
    )}
  </ResetPaymentPasswordDialog>
)
