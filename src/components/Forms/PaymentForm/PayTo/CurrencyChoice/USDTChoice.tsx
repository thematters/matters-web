import { useContext } from 'react'
import { useAccount } from 'wagmi'

import { PATHS, PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  Button,
  CurrencyFormatter,
  IconSpinner16,
  IconUSDT40,
  IconUSDTActive40,
  TextIcon,
  Translate,
  useBalanceUSDT,
  ViewerContext,
} from '~/components'
import {
  ArticleDetailPublicQuery,
  QuoteCurrency,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  recipient: UserDonationRecipientFragment
  currency: QuoteCurrency
  exchangeRate: number
  switchToSetAmount: () => void
  switchToWalletSelect: () => void
}

const USDTChoice: React.FC<FormProps> = ({
  article,
  recipient,
  currency,
  exchangeRate,
  switchToSetAmount,
  switchToWalletSelect,
}) => {
  const viewer = useContext(ViewerContext)
  const mediaHash = article.mediaHash
  const { address } = useAccount()

  const { data: balanceUSDTData, isLoading: balanceUSDTLoading } =
    useBalanceUSDT({})
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')

  const curatorAddress = viewer.info.ethAddress
  const creatorAddress = recipient.info.ethAddress

  if (mediaHash === '') {
    return (
      <section className={styles.item}>
        <TextIcon
          icon={<IconUSDT40 size="xlM" />}
          size="md"
          spacing="xtight"
          color="grey"
        >
          Tether
        </TextIcon>
        <TextIcon size="md" color="grey">
          <Translate
            zh_hant="暫時無法使用"
            zh_hans="暂时无法使用"
            en="Not available temporarily"
          />
        </TextIcon>
      </section>
    )
  }

  if (!creatorAddress) {
    return (
      <section className={styles.item}>
        <TextIcon
          icon={<IconUSDT40 size="xlM" />}
          size="md"
          spacing="xtight"
          color="grey"
        >
          Tether
        </TextIcon>
        <TextIcon size="md" color="grey">
          <Translate
            zh_hant="作者尚未啟用"
            zh_hans="作者尚未启用"
            en="The author has not opened"
          />
        </TextIcon>
      </section>
    )
  }

  if (address && !!curatorAddress && !!creatorAddress) {
    return (
      <section
        role="button"
        className={`${styles.item} ${styles.clickable}`}
        onClick={switchToSetAmount}
        aria-label="Tether"
      >
        <TextIcon
          icon={<IconUSDTActive40 size="xlM" />}
          size="md"
          spacing="xtight"
        >
          Tether
        </TextIcon>
        {balanceUSDTLoading ? (
          <IconSpinner16 color="grey" size="sm" />
        ) : (
          <CurrencyFormatter
            currency={CURRENCY.USDT}
            value={formatAmount(balanceUSDT)}
            subCurrency={currency}
            subValue={formatAmount(balanceUSDT * exchangeRate, 2)}
          />
        )}
      </section>
    )
  }

  return (
    <section className={styles.item} aria-label="Tether">
      <TextIcon
        icon={<IconUSDT40 size="xlM" color="grey" />}
        size="md"
        spacing="xtight"
        color="grey"
      >
        Tether
      </TextIcon>

      {!curatorAddress && (
        <Button
          spacing={[0, 'base']}
          size={[null, '1.5rem']}
          borderColor="green"
          borderRadius="5rem"
          href={PATHS.ME_SETTINGS_CONNECT_WALLET}
        >
          <TextIcon color="green" size="xs">
            <Translate
              zh_hant="前往設定錢包"
              zh_hans="前往设定钱包"
              en="Go to set up wallet"
            />
          </TextIcon>
        </Button>
      )}

      {!!curatorAddress && (
        <Button
          spacing={[0, 'base']}
          size={[null, '1.5rem']}
          borderColor="green"
          borderRadius="5rem"
          onClick={() => {
            switchToWalletSelect()
          }}
        >
          <TextIcon color="green" size="xs">
            <Translate
              zh_hant="連接錢包"
              zh_hans="连接钱包"
              en="Connect Wallet"
            />
          </TextIcon>
        </Button>
      )}
    </section>
  )
}

export default USDTChoice
