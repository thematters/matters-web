import classNames from 'classnames'
import { useContext } from 'react'

import { Button, ButtonProps, LanguageContext, Translate } from '~/components'

import { PAYMENT_CURRENCY } from '~/common/enums'
import { toAmountString, translate } from '~/common/utils'

import styles from './styles.css'

type CustomAmountProps = {
  balance: number
  fixed: boolean
  insufficient: boolean
} & ButtonProps

export const CustomAmount: React.FC<CustomAmountProps> = ({
  balance,
  fixed,
  insufficient,
  ...buttonProps
}) => {
  const { lang } = useContext(LanguageContext)

  const balanceClasses = classNames({
    balance: true,
    insufficient,
  })

  return (
    <section className="container">
      <Button {...buttonProps}>
        {fixed
          ? translate({ zh_hant: '其他金額', zh_hans: '其他金額', lang })
          : translate({ zh_hant: '固定金額', zh_hans: '固定金額', lang })}
      </Button>

      <span className={balanceClasses}>
        <Translate
          id={insufficient ? 'walletBalanceInsufficient' : 'walletBalance'}
        />
        <b>
          &nbsp;{PAYMENT_CURRENCY.HKD}&nbsp;{toAmountString(balance)}
        </b>
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}
