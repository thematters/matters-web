import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY } from '~/common/enums'
import { formatAmount, translate } from '~/common/utils'
import { Button, ButtonProps, LanguageContext, TextIcon } from '~/components'

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
  const { lang } = useContext(LanguageContext)

  return (
    <section className={styles.container}>
      <Button {...buttonProps}>
        <TextIcon weight="medium" size={16}>
          {fixed
            ? translate({
                zh_hant: '其他金額',
                zh_hans: '其他金額',
                en: 'other amount',
                lang,
              })
            : translate({
                zh_hant: '固定金額',
                zh_hans: '固定金額',
                en: 'fixed amount',
                lang,
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
