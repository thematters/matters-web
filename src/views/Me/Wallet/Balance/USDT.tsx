import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { formatUnits } from 'viem'

import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
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
  WithdrawVaultUSDTDialog,
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
  const canWithdrawVaultBalance = !address && vaultBalanceUSDT > 0

  const classes = classNames({
    [styles.assetsItem]: true,
    assetsItem: true, // global selector for overriding
    [styles.clickable]: canWithdrawVaultBalance,
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
    <WithdrawVaultUSDTDialog amount={vaultBalanceUSDT}>
      {({ openDialog }) => (
        <section
          className={classes}
          onClick={canWithdrawVaultBalance ? openDialog : undefined}
          role={canWithdrawVaultBalance ? 'button' : undefined}
        >
          <TextIcon
            icon={<Icon icon={IconTether} size={40} />}
            size={16}
            spacing={8}
          >
            <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
          </TextIcon>

          <TextIcon
            icon={canWithdrawVaultBalance && <Icon icon={IconRight} />}
            spacing={8}
            placement="left"
          >
            <CurrencyFormatter
              value={formatAmount(balance)}
              currency="USDT"
              subCurrency={!canWithdrawVaultBalance ? currency : undefined}
              subValue={
                !canWithdrawVaultBalance
                  ? formatAmount(balance * exchangeRate, 2)
                  : undefined
              }
              subtitle={
                canWithdrawVaultBalance && (
                  <FormattedMessage
                    defaultMessage="🔥 Claim for free"
                    id="dK7Dnj"
                  />
                )
              }
              weight="normal"
            />
          </TextIcon>
        </section>
      )}
    </WithdrawVaultUSDTDialog>
  )
}
