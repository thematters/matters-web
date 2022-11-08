import { useContext } from 'react'

import {
  Button,
  CurrencyFormatter,
  IconUSDTActive40,
  TextIcon,
  Translate,
  useBalanceUSDT,
  ViewerContext,
} from '~/components'

import { PATHS } from '~/common/enums'
import { formatAmount } from '~/common/utils'

import styles from './styles.css'

export const USDTBalance = () => {
  const viewer = useContext(ViewerContext)
  const address = viewer.info.ethAddress
  const { data: balanceUSDTData } = useBalanceUSDT({})
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')

  if (!address) {
    return (
      <section className="assetsItem">
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

        <style jsx>{styles}</style>
      </section>
    )
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
