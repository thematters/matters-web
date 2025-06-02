import { useQuery } from '@apollo/client'
import _find from 'lodash/find'
import _matchesProperty from 'lodash/matchesProperty'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconFiatCurrency from '@/public/static/icons/24px/fiat-currency.svg'
import { PAYMENT_CURRENCY as CURRENCY, TEST_ID } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  CurrencyFormatter,
  Dialog,
  Icon,
  SpinnerBlock,
  TextIcon,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'
import EXCHANGE_RATES from '~/components/GQL/queries/exchangeRates'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import {
  ArticleDetailPublicQuery,
  ExchangeRatesQuery,
  UserDonationRecipientFragment,
  WalletBalanceQuery,
} from '~/gql/graphql'

import LikeCoinChoice from './LikeCoinChoice'
import styles from './styles.module.css'
import Tips from './Tips'
import USDTChoice from './USDTChoice'

interface FormProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  recipient: UserDonationRecipientFragment
  switchToSetAmount: (c: CURRENCY) => void
  switchToWalletSelect: () => void
  closeDialog: () => void
}

const CurrencyChoice: React.FC<FormProps> = ({
  article,
  recipient,
  switchToSetAmount,
  switchToWalletSelect,
  closeDialog,
}) => {
  const intl = useIntl()

  const viewer = useContext(ViewerContext)
  const currency = viewer.settings.currency

  const { data: exchangeRateDate, loading: exchangeRateLoading } =
    useQuery<ExchangeRatesQuery>(EXCHANGE_RATES, {
      variables: {
        to: currency,
      },
    })

  // HKD、Like balance
  const { data, loading } = useQuery<WalletBalanceQuery>(WALLET_BALANCE, {
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
    <section
      className={styles.wrapper}
      data-test-id={TEST_ID.PAY_TO_CURRENCY_CHOICE}
    >
      <header className={styles.header}>
        <span>
          <Translate zh_hant="選擇支持" zh_hans="选择支持" en="Support " />
        </span>
        <span className={styles.userInfo}>
          <UserDigest.Mini
            user={recipient}
            avatarSize={16}
            textSize={15}
            textWeight="semibold"
            nameColor="black"
            spacing={4}
            hasAvatar
            hasDisplayName
          />
        </span>
        <span>
          <Translate zh_hant="的方式：" zh_hans="的方式：" en="with: " />
        </span>
      </header>

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
        className={`${styles.item} ${styles.clickable}`}
        onClick={() => {
          switchToSetAmount(CURRENCY.HKD)
        }}
        aria-label={intl.formatMessage({
          defaultMessage: 'Fiat Currency',
          id: '2lAxMG',
        })}
      >
        <TextIcon
          icon={<Icon icon={IconFiatCurrency} size={40} />}
          size={16}
          spacing={8}
        >
          <FormattedMessage defaultMessage="Fiat Currency" id="2lAxMG" />
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
    </section>
  )

  if (exchangeRateLoading || loading) {
    return <SpinnerBlock />
  }

  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        title={<FormattedMessage defaultMessage="Support Author" id="ezYuE2" />}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default CurrencyChoice
