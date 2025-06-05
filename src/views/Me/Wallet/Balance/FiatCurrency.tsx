import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconFiatCurrency from '@/public/static/icons/24px/fiat-currency.svg'
import IconRight from '@/public/static/icons/24px/right.svg'
import IconWallet from '@/public/static/icons/24px/wallet.svg'
import IconWithdraw from '@/public/static/icons/24px/withdraw.svg'
import { analytics, formatAmount } from '~/common/utils'
import {
  AddCreditDialog,
  CurrencyFormatter,
  Dropdown,
  Icon,
  Menu,
  PayoutDialog,
  SetEmailDialog,
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
  openSetEmailDialog,
}: ItemProps & { openSetEmailDialog: () => void }) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const isEmailVerified = !!viewer.info.emailVerified

  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Top Up" id="dTOtPO" />}
      icon={<Icon icon={IconWallet} size={20} />}
      onClick={() => {
        if (hasEmail && isEmailVerified) {
          openDialog()
        } else {
          openSetEmailDialog()
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
        icon={<Icon icon={IconWithdraw} size={20} />}
        onClick={openDialog}
      />
    )
  }

  return (
    <Menu.Item>
      <section className={styles.payoutItem}>
        <TextIcon
          icon={<Icon icon={IconWithdraw} size={20} color="grey" />}
          size={16}
          spacing={12}
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
    openSetEmailDialog,
  }: {
    openAddCreditDialog: () => void
    openPayoutDialog: () => void
    openSetEmailDialog: () => void
  }) => (
    <Menu>
      <TopUpItem
        openDialog={openAddCreditDialog}
        openSetEmailDialog={openSetEmailDialog}
      />
      <PayoutItem openDialog={openPayoutDialog} canPayout={canPayout} />
    </Menu>
  )

  return (
    <SetEmailDialog>
      {({ openDialog: openSetEmailDialog }) => {
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
                        openSetEmailDialog={openSetEmailDialog}
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
                          icon={<Icon icon={IconFiatCurrency} size={40} />}
                          size={16}
                          spacing={8}
                        >
                          <Translate
                            zh_hant="法幣"
                            zh_hans="法币"
                            en="Fiat Currency"
                          />
                        </TextIcon>
                        <TextIcon
                          icon={<Icon icon={IconRight} />}
                          spacing={8}
                          placement="left"
                        >
                          <CurrencyFormatter
                            value={formatAmount(balanceHKD)}
                            currency="HKD"
                            subCurrency={currency}
                            subValue={formatAmount(
                              balanceHKD * exchangeRate,
                              2
                            )}
                            weight="normal"
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
    </SetEmailDialog>
  )
}
