import { useQuery } from '@apollo/client'
import _random from 'lodash/random'
import _range from 'lodash/range'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAccount } from 'wagmi'

import IconCircleCheckFill from '@/public/static/icons/24px/circle-check-fill.svg'
import {
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS,
  SUPPORT_SUCCESS_ANIMATION,
} from '~/common/enums'
import { Dialog, Icon, SpinnerBlock, ViewerContext } from '~/components'
import {
  QueryUserByAddressQuery,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

import PaymentInfo from '../../PaymentInfo'
import { QUERY_USER_BY_ADDRESS } from './gql'
import styles from './styles.module.css'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  targetId: string
  callback?: () => void
  switchToBindWallet: () => void
}

const Complete: React.FC<Props> = ({
  amount,
  currency,
  callback,
  recipient,
  targetId,
  switchToBindWallet,
}) => {
  const viewer = useContext(ViewerContext)
  const { address } = useAccount()

  const { data, loading } = useQuery<QueryUserByAddressQuery>(
    QUERY_USER_BY_ADDRESS,
    {
      variables: {
        ethAddress: address || '0x0000000000000000000000000000000000000000',
      },
    }
  )

  const gotIt = () => {
    window.dispatchEvent(
      new CustomEvent(SUPPORT_SUCCESS_ANIMATION, {
        detail: {
          currency,
        },
      })
    )

    if (callback) {
      callback()
    }
  }

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(SUPPORT_SUCCESS))
  }, [])

  const isUSDT = currency === CURRENCY.USDT
  const isLikecoin = currency === CURRENCY.LIKE
  const isHKD = currency === CURRENCY.HKD

  if (loading) {
    return <SpinnerBlock />
  }
  const shouldBindWallet =
    viewer.info.ethAddress === null && data?.user === null

  return (
    <section className={styles.container}>
      <PaymentInfo
        amount={amount}
        currency={currency}
        recipient={recipient}
        showLikerID={isLikecoin}
        showEthAddress={isUSDT && !!recipient.info.ethAddress}
      >
        <>
          <Icon icon={IconCircleCheckFill} size={40} color="green" />
          <p className={styles.hint}>
            {isHKD && (
              <FormattedMessage
                defaultMessage="Successfully delivered"
                id="5UglrB"
              />
            )}
            {(isUSDT || isLikecoin) && (
              <FormattedMessage
                defaultMessage="Payment request has been sent"
                id="quRPwZ"
              />
            )}
          </p>
        </>
      </PaymentInfo>
      <Dialog.RoundedButton
        color="black"
        onClick={shouldBindWallet ? switchToBindWallet : gotIt}
        borderColor="greyLight"
        borderWidth="sm"
        textWeight="normal"
        borderActiveColor="grey"
        text={<FormattedMessage defaultMessage="Got it" id="NYTGIb" />}
      />
    </section>
  )
}

export default Complete
