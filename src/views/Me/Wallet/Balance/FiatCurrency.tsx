import classNames from 'classnames'

import { analytics, formatAmount } from '~/common/utils'
import {
  AddCreditDialog,
  CurrencyFormatter,
  DropdownDialog,
  IconArrowRight16,
  IconFiatCurrency40,
  IconPayout24,
  IconWallet24,
  Menu,
  PayoutDialog,
  TextIcon,
  Translate,
} from '~/components'
import { QuoteCurrency } from '~/gql/graphql'

import styles from './styles.module.css'

interface FiatCurrencyProps {
  balanceHKD: number
  canPayout: boolean
  hasStripeAccount: boolean
  currency: QuoteCurrency
  exchangeRate: number
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
  if (canPayout) {
    return (
      <Menu.Item onClick={openDialog}>
        <TextIcon icon={<IconPayout24 size="md" />} size="xm" spacing="base">
          <Translate id="paymentPayout" />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item>
      <section className={styles.payoutItem}>
        <TextIcon
          icon={<IconPayout24 size="md" color="grey" />}
          size="xm"
          spacing="base"
          color="grey"
        >
          <Translate id="paymentPayout" />
        </TextIcon>

        <section className={styles.subtitle}>
          <Translate
            zh_hant="餘額超過 500 HKD 即可提現"
            zh_hans="余额超过 500 HKD 即可提现"
            en="You can withdraw when your balance is over 500 HKD"
          />
        </section>
      </section>
    </Menu.Item>
  )
}

export const FiatCurrencyBalance: React.FC<FiatCurrencyProps> = ({
  balanceHKD,
  canPayout,
  hasStripeAccount,
  currency,
  exchangeRate,
}) => {
  const classes = classNames({
    [styles.assetsItem]: true,
    assetsItem: true, // global selector for overriding
    [styles.clickable]: true,
  })

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
              {({ openDialog, type, ref }) => (
                <section
                  className={classes}
                  onClick={openDialog}
                  aria-haspopup={type}
                  role="button"
                  ref={ref}
                >
                  <TextIcon
                    icon={<IconFiatCurrency40 size="xlM" />}
                    size="md"
                    spacing="xtight"
                  >
                    <Translate
                      zh_hant="法幣"
                      zh_hans="法币"
                      en="Fiat Currency"
                    />
                  </TextIcon>
                  <TextIcon
                    icon={<IconArrowRight16 />}
                    spacing="xtight"
                    textPlacement="left"
                  >
                    <CurrencyFormatter
                      value={formatAmount(balanceHKD)}
                      currency="HKD"
                      subCurrency={currency}
                      subValue={formatAmount(balanceHKD * exchangeRate, 2)}
                    />
                  </TextIcon>
                </section>
              )}
            </DropdownDialog>
          )}
        </AddCreditDialog>
      )}
    </PayoutDialog>
  )
}
