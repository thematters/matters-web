import { useContext } from 'react'

import { PATHS } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  Button,
  CurrencyFormatter,
  IconUSDTActive40,
  TextIcon,
  Translate,
  useBalanceUSDT,
  ViewerContext,
} from '~/components'
import { QuoteCurrency } from '~/gql/graphql'

import styles from './styles.module.css'

interface USDTBalanceProps {
  currency: QuoteCurrency
  exchangeRate: number
}

export const USDTBalance = ({ currency, exchangeRate }: USDTBalanceProps) => {
  const viewer = useContext(ViewerContext)
  const address = viewer.info.ethAddress
  const { data: balanceUSDTData } = useBalanceUSDT({})
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')

  if (!address) {
    return (
      <section className={styles.assetsItem}>
        <TextIcon
          icon={<IconUSDTActive40 size="xl-m" />}
          size="md"
          spacing="xtight"
        >
          <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
        </TextIcon>

        <Button
          spacing={[0, 'tight']}
          size={[null, '1.5rem']}
          borderColor="black"
          href={PATHS.ME_SETTINGS_CONNECT_WALLET}
        >
          <TextIcon color="black" size="xs">
            <Translate zh_hant="前往設置" zh_hans="前往设置" en="Setup" />
          </TextIcon>
        </Button>
      </section>
    )
  }

  return (
    <section className={styles.assetsItem}>
      <TextIcon
        icon={<IconUSDTActive40 size="xl-m" />}
        size="md"
        spacing="xtight"
      >
        <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
      </TextIcon>

      <CurrencyFormatter
        value={formatAmount(balanceUSDT)}
        currency="USDT"
        subCurrency={currency}
        subValue={formatAmount(balanceUSDT * exchangeRate, 2)}
      />
    </section>
  )
}
