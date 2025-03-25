import { useQuery } from '@apollo/client'
import _find from 'lodash/find'
import _matchesProperty from 'lodash/matchesProperty'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  PATHS,
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MINIMAL_PAYOUT_AMOUNT,
} from '~/common/enums'
import {
  Button,
  Head,
  Layout,
  SpinnerBlock,
  TableView,
  TextIcon,
  ViewerContext,
  WithdrawVaultUSDTDialog,
} from '~/components'
import EXCHANGE_RATES from '~/components/GQL/queries/exchangeRates'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import { ExchangeRatesQuery, WalletBalanceQuery } from '~/gql/graphql'

import { FiatCurrencyBalance, LikeCoinBalance, USDTBalance } from './Balance'
import PaymentPassword from './PaymentPassword'
import styles from './styles.module.css'
import ViewStripeAccount from './ViewStripeAccount'
import ViewStripeCustomerPortal from './ViewStripeCustomerPortal'

const Wallet = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)

  const currency = viewer.settings.currency

  const { data: exchangeRateDate, loading: exchangeRateLoading } =
    useQuery<ExchangeRatesQuery>(EXCHANGE_RATES, {
      variables: {
        to: currency,
      },
    })

  const exchangeRateUSDT = _find(
    exchangeRateDate?.exchangeRates,
    _matchesProperty('from', CURRENCY.USDT)
  )

  const exchangeRateHKD = _find(
    exchangeRateDate?.exchangeRates,
    _matchesProperty('from', CURRENCY.HKD)
  )

  const exchangeRateLIKE = _find(
    exchangeRateDate?.exchangeRates,
    _matchesProperty('from', CURRENCY.LIKE)
  )

  const { data, loading } = useQuery<WalletBalanceQuery>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
    errorPolicy: 'none',
    skip: typeof window === 'undefined',
  })
  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const canPayout = balanceHKD >= PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD
  const hasStripeAccount = !!data?.viewer?.wallet.stripeAccount?.id
  const hasPaymentPassword = viewer.status?.hasPaymentPassword

  if (exchangeRateLoading || loading) {
    return (
      <Layout.Main>
        <Layout.Header
          left={
            <Layout.Header.Title>
              <FormattedMessage defaultMessage="Wallet" id="3yk8fB" />
            </Layout.Header.Title>
          }
        />
        <SpinnerBlock />
      </Layout.Main>
    )
  }

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Wallet" id="3yk8fB" />
          </Layout.Header.Title>
        }
        right={
          <>
            <span />
            <Button
              spacing={[0, 12]}
              size={[null, '2rem']}
              borderColor="green"
              href={PATHS.ME_WALLET_TRANSACTIONS}
            >
              <TextIcon color="green" weight="medium">
                <FormattedMessage defaultMessage="Transactions" id="/jJLYy" />
              </TextIcon>
            </Button>
          </>
        }
      />

      <Head
        title={intl.formatMessage({ defaultMessage: 'Wallet', id: '3yk8fB' })}
      />

      <section className={styles.assetsContainer}>
        <FiatCurrencyBalance
          balanceHKD={balanceHKD}
          canPayout={canPayout}
          hasStripeAccount={hasStripeAccount}
          currency={currency}
          exchangeRate={exchangeRateHKD?.rate || 0}
        />
        <USDTBalance
          currency={currency}
          exchangeRate={exchangeRateUSDT?.rate || 0}
        />
        <LikeCoinBalance
          currency={currency}
          exchangeRate={exchangeRateLIKE?.rate || 0}
        />
      </section>

      <Layout.Main.Spacing>
        <TableView spacingX={0}>
          {hasPaymentPassword && <PaymentPassword />}

          <ViewStripeCustomerPortal />

          {hasStripeAccount && <ViewStripeAccount />}
        </TableView>
      </Layout.Main.Spacing>

      <WithdrawVaultUSDTDialog />
    </Layout.Main>
  )
}
export default Wallet
