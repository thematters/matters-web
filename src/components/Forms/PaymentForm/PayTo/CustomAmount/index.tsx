import { useContext } from 'react'

import { Button, ButtonProps, LanguageContext, Translate } from '~/components'

import { PAYMENT_CURRENCY } from '~/common/enums'
import { toAmountString, translate } from '~/common/utils'

import styles from './styles.css'

type CustomAmountProps = {
  balance: number
  fixed: boolean
} & ButtonProps

export const CustomAmount: React.FC<CustomAmountProps> = ({
  balance,
  fixed,
  ...buttonProps
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <section className="container">
      <Button {...buttonProps}>
        {fixed
          ? translate({ zh_hant: '其他金額', zh_hans: '其他金額', lang })
          : translate({ zh_hant: '固定金額', zh_hans: '固定金額', lang })}
      </Button>

      <span className="wallet-balance">
        <Translate id="walletBalance" /> {PAYMENT_CURRENCY.HKD}{' '}
        <b>{toAmountString(balance)}</b>
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}
