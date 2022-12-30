import { useQuery } from '@apollo/react-hooks'
import _find from 'lodash/find'
import _matchesProperty from 'lodash/matchesProperty'
import { useContext } from 'react'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  CurrencyFormatter,
  Dialog,
  IconFiatCurrency40,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'
import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { ExchangeRates } from '~/components/GQL/queries/__generated__/ExchangeRates'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'
import EXCHANGE_RATES from '~/components/GQL/queries/exchangeRates'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import { ArticleDetailPublic_article } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'

import LikeCoinChoice from './LikeCoinChoice'
import styles from './styles.css'
import Tips from './Tips'
import USDTChoice from './USDTChoice'

interface FormProps {
  article: ArticleDetailPublic_article
  recipient: UserDonationRecipient
  switchToSetAmount: (c: CURRENCY) => void
  switchToWalletSelect: () => void
}

const CurrencyChoice: React.FC<FormProps> = ({
  article,
  recipient,
  switchToSetAmount,
  switchToWalletSelect,
}) => {
  const viewer = useContext(ViewerContext)
  const currency = viewer.settings.currency

  const { data: exchangeRateDate, loading: exchangeRateLoading } =
    useQuery<ExchangeRates>(EXCHANGE_RATES, {
      variables: {
        to: currency,
      },
    })

  // HKD、Like balance
  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
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

  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const balanceLike = data?.viewer?.liker.total || 0

  const InnerForm = (
    <section className="wrapper">
      <section className="header">
        <span>
          <Translate zh_hant="選擇支持" zh_hans="选择支持" en="Support " />
        </span>
        <span className="userInfo">
          <UserDigest.Mini
            user={recipient}
            avatarSize="xs"
            textSize="md-s"
            textWeight="semibold"
            nameColor="black"
            spacing="xxtight"
            hasAvatar
            hasDisplayName
          />
        </span>
        <span>
          <Translate zh_hant="的方式：" zh_hans="的方式：" en="with: " />
        </span>
      </section>

      {/* USDT */}
      <USDTChoice
        article={article}
        recipient={recipient}
        currency={currency}
        exchangeRate={exchangeRateUSDT?.rate || 0}
        switchToSetAmount={() => switchToSetAmount(CURRENCY.USDT)}
        switchToWalletSelect={switchToWalletSelect}
      />

      {/* HKD */}
      <section
        role="button"
        className="item clickable"
        onClick={() => {
          switchToSetAmount(CURRENCY.HKD)
        }}
      >
        <TextIcon
          icon={<IconFiatCurrency40 size="xl-m" />}
          size="md"
          spacing="xtight"
        >
          <Translate zh_hant="法幣" zh_hans="法币" en="Fiat Currency" />
        </TextIcon>
        <CurrencyFormatter
          value={formatAmount(balanceHKD)}
          currency={CURRENCY.HKD}
          subCurrency={currency}
          subValue={formatAmount(balanceHKD * (exchangeRateHKD?.rate || 0), 2)}
        />
      </section>

      {/* LikeCoin */}
      <LikeCoinChoice
        balance={balanceLike}
        recipient={recipient}
        currency={currency}
        exchangeRate={exchangeRateLIKE?.rate || 0}
        switchToSetAmount={() => switchToSetAmount(CURRENCY.LIKE)}
      />

      <Tips />

      <style jsx>{styles}</style>
    </section>
  )

  if (exchangeRateLoading || loading) {
    return <Spinner />
  }

  return (
    <>
      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default CurrencyChoice
