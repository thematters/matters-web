import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import { PAYMENT_CURRENCY } from '~/common/enums'
import { toAmountString, translate } from '~/common/utils'

import styles from './styles.css'

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
    <section className="container">
      <Button {...buttonProps}>
        <TextIcon weight="md" size="md">
          {fixed
            ? translate({ zh_hant: '其他金額', zh_hans: '其他金額', lang })
            : translate({ zh_hant: '固定金額', zh_hans: '固定金額', lang })}
        </TextIcon>
      </Button>

      {showBalance && (
        <span>
          <TextIcon size="sm">
            <Translate
              id={insufficient ? 'walletBalanceInsufficient' : 'walletBalance'}
            />
          </TextIcon>
          <TextIcon weight="md" size="sm">
            &nbsp;{PAYMENT_CURRENCY.HKD}&nbsp;{toAmountString(balance)}
          </TextIcon>
        </span>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}
