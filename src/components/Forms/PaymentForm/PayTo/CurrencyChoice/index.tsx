import { useQuery } from '@apollo/react-hooks'
import _pickBy from 'lodash/pickBy'

import {
  Avatar,
  CurrencyFormatter,
  Dialog,
  IconFiatCurrency40,
  IconLikeCoin40,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'

import styles from './styles.css'
import Tips from './Tips'
import USDTChoice from './USDTChoice'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { PayTo_payTo_transaction as PayToTx } from '~/components/GQL/mutations/__generated__/PayTo'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToTx
}

interface FormProps {
  closeDialog: () => void
  defaultCurrency?: CURRENCY
  openTabCallback: (values: SetAmountOpenTabCallbackValues) => void
  recipient: UserDonationRecipient
  submitCallback: (values: SetAmountCallbackValues) => void
  switchToSetAmount: (c: CURRENCY) => void
  switchToWalletSelect: () => void
  targetId: string
}

const CurrencyChoice: React.FC<FormProps> = ({
  closeDialog,
  defaultCurrency,
  openTabCallback,
  recipient,
  submitCallback,
  switchToSetAmount,
  switchToWalletSelect,
  targetId,
}) => {
  // HKD balance
  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })

  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const balanceLike = data?.viewer?.liker.total || 0

  const InnerForm = (
    <section className="wrapper">
      <section className="header">
        <span>
          <Translate zh_hant="選擇支持" zh_hans="选择支持" en="Support " />
        </span>
        <span className="userInfo">
          <Avatar user={recipient} size="xs" />
          <span className="userName">{recipient.displayName}</span>
        </span>
        <span>
          <Translate zh_hant="的方式" zh_hans="的方式" en="with: " />
        </span>
      </section>

      {/* USDT */}
      <USDTChoice
        recipient={recipient}
        switchToSetAmount={switchToSetAmount}
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
        <CurrencyFormatter value={formatAmount(balanceHKD)} currency="HKD" />
      </section>

      {/* LikeCoin */}
      <section
        role="button"
        className="item clickable"
        onClick={() => {
          switchToSetAmount(CURRENCY.LIKE)
        }}
      >
        <TextIcon
          icon={<IconLikeCoin40 size="xl-m" />}
          size="md"
          spacing="xtight"
        >
          <Translate zh_hant="LikeCoin" zh_hans="LikeCoin" en="LikeCoin" />
        </TextIcon>
        <CurrencyFormatter
          value={formatAmount(balanceLike, 0)}
          currency="LIKE"
        />
      </section>

      <Tips />

      <style jsx>{styles}</style>
    </section>
  )

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default CurrencyChoice
