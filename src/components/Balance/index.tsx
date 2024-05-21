import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import { Button, SetEmailDialog, TextIcon, ViewerContext } from '~/components'

import styles from './styles.module.css'

type BalanceProps = {
  currency: CURRENCY
  amount: number
  isBalanceInsufficient?: boolean
  showTopUp?: boolean
  switchToAddCredit?: () => void
  loading?: boolean
}

const BalanceMessage: React.FC<{
  isHKD: boolean
  isBalanceInsufficient: boolean
}> = ({ isHKD, isBalanceInsufficient }) => {
  return (
    <span className={styles.message}>
      {isHKD && isBalanceInsufficient ? (
        <FormattedMessage
          defaultMessage="Insufficient: "
          description="src/components/Balance/index.tsx"
          id="hWq/ii"
        />
      ) : (
        <FormattedMessage
          defaultMessage="Balance:"
          description="src/components/Balance/index.tsx"
          id="1U/MPD"
        />
      )}
    </span>
  )
}

const BalanceAmount: React.FC<{
  currency: CURRENCY
  formattedAmount: string
}> = ({ currency, formattedAmount }) => {
  if (currency === CURRENCY.USDT) return <span>USDT {formattedAmount}</span>
  if (currency === CURRENCY.HKD) return <span>HKD {formattedAmount}</span>
  if (currency === CURRENCY.LIKE) return <span>LIKE {formattedAmount}</span>
  return null
}

const TopUpButton: React.FC<{
  isBalanceInsufficient: boolean
  switchToAddCredit?: () => void
}> = ({ isBalanceInsufficient, switchToAddCredit }) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const isEmailVerified = !!viewer.info.emailVerified
  const topUpButtonClasses = classNames(styles.topUpButton, {
    [styles.insufficientBorder]: isBalanceInsufficient,
  })

  return (
    <SetEmailDialog>
      {({ openDialog }) => (
        <section className={topUpButtonClasses}>
          <Button
            onClick={
              hasEmail && isEmailVerified ? switchToAddCredit : openDialog
            }
          >
            <TextIcon
              size={14}
              decoration="underline"
              color={isBalanceInsufficient ? 'black' : 'gold'}
              weight="medium"
            >
              <FormattedMessage
                defaultMessage="Top up"
                id="hAyhzq"
                description="SUPPORT_HKD"
              />
            </TextIcon>
          </Button>
        </section>
      )}
    </SetEmailDialog>
  )
}

export const Balance: React.FC<BalanceProps> = ({
  currency,
  amount,
  isBalanceInsufficient = false,
  showTopUp = true,
  switchToAddCredit,
  loading = false,
}) => {
  const isHKD = currency === CURRENCY.HKD

  const formattedAmount = formatAmount(
    amount,
    currency === CURRENCY.USDT ? 2 : 0
  )

  if (loading) {
    return (
      <span className={styles.container}>
        <FormattedMessage defaultMessage="Balance loading..." id="E7vGxB" />
      </span>
    )
  }

  const containerClasses = classNames(styles.container, {
    [styles.insufficient]: isHKD && isBalanceInsufficient,
  })

  return (
    <span className={containerClasses}>
      <>
        <BalanceMessage
          isHKD={isHKD}
          isBalanceInsufficient={isBalanceInsufficient}
        />
      </>
      <span className={styles.balance} title={formattedAmount}>
        <BalanceAmount currency={currency} formattedAmount={formattedAmount} />
      </span>
      {isHKD && showTopUp && (
        <TopUpButton
          isBalanceInsufficient={isBalanceInsufficient}
          switchToAddCredit={switchToAddCredit}
        />
      )}
    </span>
  )
}
