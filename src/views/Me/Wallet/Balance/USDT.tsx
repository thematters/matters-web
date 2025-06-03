import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { formatUnits } from 'viem'

import IconRight from '@/public/static/icons/24px/right.svg'
import IconTether from '@/public/static/icons/24px/tether.svg'
import {
  contract,
  OPEN_WITHDRAW_VAULT_USDT_DIALOG,
  PATHS,
  REFETCH_BALANCE_USDT,
} from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  Button,
  CurrencyFormatter,
  Icon,
  Spinner,
  TextIcon,
  Translate,
  useBalanceUSDT,
  useEventListener,
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
  const {
    data: balanceUSDTData,
    refetch: refetchBalanceUSDT,
    isLoading: balanceUSDTLoading,
  } = useBalanceUSDT({})
  const {
    data: vaultBalanceUSDTData,
    refetch: refetchVaultBalanceUSDT,
    isLoading: vaultBalanceUSDTLoading,
  } = useVaultBalanceUSDT()
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')
  const vaultBalanceUSDT = parseFloat(
    formatUnits(
      BigInt(vaultBalanceUSDTData || '0'),
      contract.Optimism.tokenDecimals
    )
  )
  const balance = address ? balanceUSDT : vaultBalanceUSDT
  const loading = balanceUSDTLoading || vaultBalanceUSDTLoading
  const hasVaultBalance = vaultBalanceUSDT > 0

  const classes = classNames({
    [styles.assetsItem]: true,
    assetsItem: true, // global selector for overriding
    [styles.clickable]: hasVaultBalance,
  })

  const openWithdrawVaultUSDTDialog = () => {
    window.dispatchEvent(new CustomEvent(OPEN_WITHDRAW_VAULT_USDT_DIALOG, {}))
  }

  useEventListener(REFETCH_BALANCE_USDT, () => {
    refetchBalanceUSDT()
    refetchVaultBalanceUSDT()
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
    <section
      className={classes}
      onClick={hasVaultBalance ? openWithdrawVaultUSDTDialog : undefined}
      role={hasVaultBalance ? 'button' : undefined}
    >
      <TextIcon
        icon={<Icon icon={IconTether} size={40} />}
        size={16}
        spacing={8}
      >
        <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
      </TextIcon>

      {loading ? (
        <Spinner color="greyLight" size={14} />
      ) : (
        <TextIcon
          icon={hasVaultBalance && <Icon icon={IconRight} />}
          spacing={8}
          placement="left"
        >
          <CurrencyFormatter
            value={formatAmount(balance)}
            currency="USDT"
            subCurrency={!hasVaultBalance ? currency : undefined}
            subValue={
              !hasVaultBalance
                ? formatAmount(balance * exchangeRate, 2)
                : undefined
            }
            subtitle={
              hasVaultBalance ? (
                !address ? (
                  <FormattedMessage
                    defaultMessage="🔥 Claim for free"
                    id="dK7Dnj"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="USDT {amount} pending claim"
                    id="2Sgvfr"
                    values={{ amount: formatAmount(vaultBalanceUSDT) }}
                  />
                )
              ) : undefined
            }
            weight="normal"
          />
        </TextIcon>
      )}
    </section>
  )
}
