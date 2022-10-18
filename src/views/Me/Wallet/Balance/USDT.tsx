import { formatUnits } from 'ethers/lib/utils'
import { useContext } from 'react'

import {
  CurrencyFormatter,
  IconUSDTActive40,
  TextIcon,
  Translate,
  useBalanceOf,
  ViewerContext,
} from '~/components'

import styles from './styles.css'

export const USDTBalance = () => {
  const viewer = useContext(ViewerContext)
  const address = viewer.info.ethAddress
  const { data: balanceOfData } = useBalanceOf({ address })

  const balanceUSDT = (balanceOfData && formatUnits(balanceOfData)) || 0

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

      <CurrencyFormatter currency={balanceUSDT} currencyCode={'USDT'} />

      <style jsx>{styles}</style>
    </section>
  )
}
