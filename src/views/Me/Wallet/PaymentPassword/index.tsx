import { FormattedMessage } from 'react-intl'

import IconUnlock from '@/public/static/icons/24px/unlock.svg'
import {
  Dropdown,
  Icon,
  Menu,
  ResetPaymentPasswordDialog,
  TableView,
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
        text={
          <FormattedMessage
            defaultMessage="Reset Payment Password"
            id="+OStJM"
          />
        }
        icon={<Icon icon={IconUnlock} size={20} />}
        onClick={openResetPaymentPasswordDialog}
        ariaHasPopup="dialog"
      />
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <TableView.Cell
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
