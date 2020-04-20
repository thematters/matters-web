import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Spinner, Translate } from '~/components'

import { numFormat } from '~/common/utils'

import styles from './styles.css'

import { MeWalletBalance } from './__generated__/MeWalletBalance'

const ME_WALLET_BALANCE = gql`
  query MeWalletBalance {
    viewer {
      id
      wallet {
        balance {
          HKD
        }
      }
    }
  }
`

const Balance = () => {
  const { data, loading } = useQuery<MeWalletBalance>(ME_WALLET_BALANCE)

  if (loading) {
    return <Spinner />
  }

  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0

  return (
    <section className="balance">
      <p className="hint">
        <Translate zh_hant="可用餘額" zh_hans="可用余额" />
      </p>

      <p className="amount">
        <span className="currency">HKD</span>
        <span>{numFormat(balanceHKD)}</span>
      </p>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Balance
