import { useQuery } from '@apollo/react-hooks'
import _find from 'lodash/find'
import _matchesProperty from 'lodash/matchesProperty'
import { useContext } from 'react'

import {
  Form,
  Head,
  Layout,
  PullToRefresh,
  Spinner,
  ViewerContext,
} from '~/components'
import EXCHANGE_RATES from '~/components/GQL/queries/exchangeRates'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import {
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MINIMAL_PAYOUT_AMOUNT,
} from '~/common/enums'

import { FiatCurrencyBalance, LikeCoinBalance, USDTBalance } from './Balance'
import PaymentPassword from './PaymentPassword'
import PaymentPointer from './PaymentPointer'
import styles from './styles.css'
import TotalAssets from './TotalAssets'
import ViewStripeAccount from './ViewStripeAccount'
import ViewStripeCustomerPortal from './ViewStripeCustomerPortal'

import { ExchangeRates } from '~/components/GQL/queries/__generated__/ExchangeRates'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

const Wallet = () => {
  const viewer = useContext(ViewerContext)

  const currency = viewer.settings.currency

  const { data: exchangeRateDate, loading: exchangeRateLoading } =
    useQuery<ExchangeRates>(EXCHANGE_RATES, {
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

  const { data, loading, refetch } = useQuery<WalletBalance>(WALLET_BALANCE, {
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
          left={<Layout.Header.BackButton />}
          right={<Layout.Header.Title id="myWallet" />}
        />
        <Spinner />
      </Layout.Main>
    )
  }

  return (
    <Layout.Main smBgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="myWallet" />}
      />

      <Head title={{ id: 'myWallet' }} />

      <PullToRefresh refresh={refetch}>
        <TotalAssets />

        <section className="assetsContainer">
          <FiatCurrencyBalance
            balanceHKD={balanceHKD}
            canPayout={canPayout}
            hasStripeAccount={hasStripeAccount}
            currency={currency}
            exchangeRate={exchangeRateHKD?.rate || 0}
          />
          <LikeCoinBalance
            currency={currency}
            exchangeRate={exchangeRateLIKE?.rate || 0}
          />
          <USDTBalance
            currency={currency}
            exchangeRate={exchangeRateUSDT?.rate || 0}
          />
        </section>

        <Form.List>
          {hasPaymentPassword && <PaymentPassword />}
          <ViewStripeCustomerPortal />
          {hasStripeAccount && <ViewStripeAccount />}
          <PaymentPointer />
        </Form.List>
        <style jsx>{styles}</style>
      </PullToRefresh>
    </Layout.Main>
  )
}
export default Wallet
