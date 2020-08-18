import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import { Button, ButtonProps, LanguageContext, Translate } from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { toAmountString, translate } from '~/common/utils'

import styles from './styles.css'

import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

type CustomAmountProps = {
  fixed: boolean
} & ButtonProps

export const CustomAmount: React.FC<CustomAmountProps> = ({
  fixed,
  ...buttonProps
}) => {
  const { lang } = useContext(LanguageContext)
  const { data } = useQuery<WalletBalance>(WALLET_BALANCE)
  const balance = data?.viewer?.wallet.balance.HKD || 0

  return (
    <section className="container">
      <Button {...buttonProps}>
        {fixed
          ? translate({ zh_hant: '其他金額', zh_hans: '其他金額', lang })
          : translate({ zh_hant: '固定金額', zh_hans: '固定金額', lang })}
      </Button>

      <span className="wallet-balance">
        <Translate id="walletBalance" /> {toAmountString(balance)}
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}
