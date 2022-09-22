import {
  AddCreditDialog,
  DropdownDialog,
  Form,
  IconFiatCurrency40,
  IconPayout24,
  IconWallet24,
  Menu,
  PayoutDialog,
  TextIcon,
  Translate,
} from '~/components'

import { analytics } from '~/common/utils'

import CurrencyFormatter from './CurrencyFormatter'
import styles from './styles.css'

interface FiatCurrencyProps {
  balanceHKD: number
  canPayout: boolean
  hasStripeAccount: boolean
}

interface ItemProps {
  openDialog: () => void
}

const TopUpItem = ({ openDialog }: ItemProps) => {
  return (
    <Menu.Item
      onClick={() => {
        openDialog()
        analytics.trackEvent('click_button', { type: 'top_up' })
      }}
    >
      <TextIcon icon={<IconWallet24 size="md" />} size="xm" spacing="base">
        <Translate id="topUp" />
      </TextIcon>
    </Menu.Item>
  )
}

const PayoutItem = ({
  openDialog,
  canPayout,
}: ItemProps & { canPayout: boolean }) => {
  return canPayout ? (
    <Menu.Item
      onClick={() => {
        openDialog()
        analytics.trackEvent('click_button', { type: 'top_up' })
      }}
    >
      <TextIcon icon={<IconPayout24 size="md" />} size="xm" spacing="base">
        <Translate id="paymentPayout" />
      </TextIcon>
    </Menu.Item>
  ) : (
    <Menu.Item>
      <section className="payoutItem">
        <TextIcon
          icon={<IconPayout24 size="md" color="grey" />}
          size="xm"
          spacing="base"
          color="grey"
        >
          <Translate id="paymentPayout" />
        </TextIcon>
        <TextIcon size="sm-s">
          <Translate
            zh_hant="餘額超過 500 HKD 就可提現"
            zh_hans="余额超过 500 HKD 就可提现"
            en="You can withdraw when your balance is over 500 HKD"
          />
        </TextIcon>
        <style jsx>{styles}</style>
      </section>
    </Menu.Item>
  )
}

export const FiatCurrency: React.FC<FiatCurrencyProps> = ({
  balanceHKD,
  canPayout,
  hasStripeAccount,
}) => {
  const Content = ({
    isInDropdown,
    openAddCreditDialog,
    openPayoutDialog,
  }: {
    isInDropdown?: boolean
    openAddCreditDialog: () => void
    openPayoutDialog: () => void
  }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <TopUpItem openDialog={openAddCreditDialog} />
      <PayoutItem openDialog={openPayoutDialog} canPayout={canPayout} />
    </Menu>
  )

  return (
    <PayoutDialog hasStripeAccount={hasStripeAccount}>
      {({ openDialog: openPayoutDialog }) => (
        <AddCreditDialog>
          {({ openDialog: openAddCreditDialog }) => (
            <DropdownDialog
              dropdown={{
                content: (
                  <Content
                    isInDropdown
                    openAddCreditDialog={openAddCreditDialog}
                    openPayoutDialog={openPayoutDialog}
                  />
                ),
                placement: 'bottom-end',
              }}
              dialog={{
                content: (
                  <Content
                    openAddCreditDialog={openAddCreditDialog}
                    openPayoutDialog={openPayoutDialog}
                  />
                ),
                title: 'moreActions',
              }}
            >
              {({ openDialog, ref }) => (
                <Form.List.Item
                  title={
                    <TextIcon
                      icon={<IconFiatCurrency40 size="xl-m" />}
                      size="md"
                      spacing="xtight"
                    >
                      <Translate
                        zh_hant="法幣"
                        zh_hans="法币"
                        en="Fiat Currency"
                      />
                    </TextIcon>
                  }
                  rightText={
                    <CurrencyFormatter
                      currency={balanceHKD}
                      currencyCode={'HKD'}
                    />
                  }
                  bold
                  onClick={openDialog}
                  ref={ref}
                />
              )}
            </DropdownDialog>
          )}
        </AddCreditDialog>
      )}
    </PayoutDialog>
  )
}

// const FiatCurrency = () => {

// }
