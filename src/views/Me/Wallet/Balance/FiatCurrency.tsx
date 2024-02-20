import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, formatAmount } from '~/common/utils'
import {
  AddCreditDialog,
  BindEmailHintDialog,
  CurrencyFormatter,
  Dropdown,
  IconArrowRight16,
  IconFiatCurrency40,
  IconPayout24,
  IconWallet24,
  Menu,
  PayoutDialog,
  TextIcon,
  Translate,
  ViewerContext,
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

const TopUpItem = ({
  openDialog,
  openBindEmailHintDialog,
}: ItemProps & { openBindEmailHintDialog: () => void }) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Top Up" id="dTOtPO" />}
      icon={<IconWallet24 size="mdS" />}
      onClick={() => {
        if (hasEmail) {
          openDialog()
        } else {
          openBindEmailHintDialog()
        }
        analytics.trackEvent('click_button', { type: 'top_up' })
      }}
    />
  )
}

const PayoutItem = ({
  openDialog,
  canPayout,
}: ItemProps & { canPayout: boolean }) => {
  if (canPayout) {
    return (
      <Menu.Item
        text={<FormattedMessage defaultMessage="Withdraw" id="PXAur5" />}
        icon={<IconPayout24 size="mdS" />}
        onClick={openDialog}
      />
    )
  }

  return (
    <Menu.Item>
      <section className={styles.payoutItem}>
        <TextIcon
          icon={<IconPayout24 size="mdS" color="grey" />}
          size="md"
          spacing="tight"
          color="grey"
        >
          <FormattedMessage defaultMessage="Withdraw" id="PXAur5" />
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
    openAddCreditDialog,
    openPayoutDialog,
    openBindEmailHintDialog,
  }: {
    openAddCreditDialog: () => void
    openPayoutDialog: () => void
    openBindEmailHintDialog: () => void
  }) => (
    <Menu>
      <TopUpItem
        openDialog={openAddCreditDialog}
        openBindEmailHintDialog={openBindEmailHintDialog}
      />
      <PayoutItem openDialog={openPayoutDialog} canPayout={canPayout} />
    </Menu>
  )

  return (
    <BindEmailHintDialog>
      {({ openDialog: openBindEmailHintDialog }) => {
        return (
          <PayoutDialog hasStripeAccount={hasStripeAccount}>
            {({ openDialog: openPayoutDialog }) => (
              <AddCreditDialog>
                {({ openDialog: openAddCreditDialog }) => (
                  <Dropdown
                    content={
                      <Content
                        openAddCreditDialog={openAddCreditDialog}
                        openPayoutDialog={openPayoutDialog}
                        openBindEmailHintDialog={openBindEmailHintDialog}
                      />
                    }
                  >
                    {({ openDropdown, ref }) => (
                      <section
                        className={classes}
                        aria-haspopup="listbox"
                        role="button"
                        onClick={openDropdown}
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
                            subValue={formatAmount(
                              balanceHKD * exchangeRate,
                              2
                            )}
                          />
                        </TextIcon>
                      </section>
                    )}
                  </Dropdown>
                )}
              </AddCreditDialog>
            )}
          </PayoutDialog>
        )
      }}
    </BindEmailHintDialog>
  )
}
