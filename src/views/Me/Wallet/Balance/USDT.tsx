import { useContext } from 'react'

import {
  CurrencyFormatter,
  IconUSDTActive40,
  TextIcon,
  Translate,
  useBalanceUSDT,
  ViewerContext,
} from '~/components'

import { formatAmount } from '~/common/utils'

import styles from './styles.css'

export const USDTBalance = () => {
  const viewer = useContext(ViewerContext)
  const address = viewer.info.ethAddress
  const { data: balanceUSDTData } = useBalanceUSDT({ address })
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')

  if (!address) {
    return null
  }

  return (
    <section className="assetsItem">
      <TextIcon
        icon={<IconUSDTActive40 size="xl-m" />}
        size="md"
        spacing="xtight"
      >
        <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
      </TextIcon>

      <CurrencyFormatter value={formatAmount(balanceUSDT)} currency="USDT" />

      <style jsx>{styles}</style>
    </section>
  )
}
