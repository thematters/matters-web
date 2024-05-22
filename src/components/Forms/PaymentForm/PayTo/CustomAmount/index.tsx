import { FormattedMessage, useIntl } from 'react-intl'

import { PAYMENT_CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import { Button, ButtonProps, TextIcon } from '~/components'

import styles from './styles.module.css'

type CustomAmountProps = {
  balance: number
  fixed: boolean
  insufficient: boolean
  showBalance: boolean
} & ButtonProps

export const CustomAmount: React.FC<CustomAmountProps> = ({
  balance,
  fixed,
  insufficient,
  showBalance,
  ...buttonProps
}) => {
  const intl = useIntl()

  return (
    <section className={styles.container}>
      <Button {...buttonProps}>
        <TextIcon weight="medium" size={16}>
          {fixed
            ? intl.formatMessage({
                defaultMessage: 'other amount',
                id: 'hBLCwn',
              })
            : intl.formatMessage({
                defaultMessage: 'fixed amount',
                id: 'v+hbfO',
              })}
        </TextIcon>
      </Button>

      {showBalance && (
        <span>
          <TextIcon size={14}>
            {insufficient ? (
              <FormattedMessage
                defaultMessage="Insufficient Balance"
                id="0tHLRn"
              />
            ) : (
              <FormattedMessage defaultMessage="Balance" id="H5+NAX" />
            )}
          </TextIcon>
          <TextIcon weight="medium" size={14}>
            &nbsp;{PAYMENT_CURRENCY.HKD}&nbsp;{formatAmount(balance)}
          </TextIcon>
        </span>
      )}
    </section>
  )
}
