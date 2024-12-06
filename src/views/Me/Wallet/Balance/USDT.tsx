import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { formatUnits } from 'viem'

import { ReactComponent as IconTether } from '@/public/static/icons/24px/tether.svg'
import { contract, PATHS } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  Button,
  CurrencyFormatter,
  Icon,
  TextIcon,
  Translate,
  useBalanceUSDT,
  useVaultBalanceUSDT,
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
  const { data: vaultBalanceUSDTData } = useVaultBalanceUSDT()
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')
  const vaultBalanceUSDT = parseFloat(
    formatUnits(
      BigInt(vaultBalanceUSDTData || '0'),
      contract.Optimism.tokenDecimals
    )
  )
  const balance = address ? balanceUSDT : vaultBalanceUSDT

  const classes = classNames({
    [styles.assetsItem]: true,
    assetsItem: true, // global selector for overriding
  })

  if (!address && !vaultBalanceUSDT) {
    return (
      <section className={classes}>
        <TextIcon
          icon={<Icon icon={IconTether} size={40} />}
          size={16}
          spacing={8}
        >
          <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
        </TextIcon>

        <Button
          spacing={[0, 12]}
          size={[null, '1.5rem']}
          borderColor="green"
          href={PATHS.ME_SETTINGS}
        >
          <TextIcon color="green" size={14}>
            <FormattedMessage
              defaultMessage="Connect"
              description="src/views/Me/Wallet/Balance"
              id="9WMs5q"
            />
          </TextIcon>
        </Button>
      </section>
    )
  }

  return (
    <section className={classes}>
      <TextIcon
        icon={<Icon icon={IconTether} size={40} />}
        size={16}
        spacing={8}
      >
        <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
      </TextIcon>

      <CurrencyFormatter
        value={formatAmount(balance)}
        currency="USDT"
        subCurrency={address ? currency : undefined}
        subValue={address ? formatAmount(balance * exchangeRate, 2) : undefined}
        subtitle={
          !address && (
            <FormattedMessage defaultMessage="🔥 Claim for free" id="dK7Dnj" />
          )
        }
        weight="normal"
      />
    </section>
  )
}
