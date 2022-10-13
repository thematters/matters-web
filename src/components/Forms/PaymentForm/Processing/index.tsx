import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'

import { Dialog, Spinner, Translate } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import PaymentInfo from '../PaymentInfo'
import PayToFallback from './PayToFallback'
import styles from './styles.css'

import { UserDonationRecipient } from '@/src/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { ViewerTxState } from './__generated__/ViewerTxState'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  txId: string
  nextStep: () => void
  closeDialog: () => void
  windowRef?: Window
}

const VIEWER_TX_STATE = gql`
  query ViewerTxState($id: ID!) {
    viewer {
      id
      wallet {
        balance {
          HKD
        }
        transactions(input: { id: $id }) {
          edges {
            node {
              id
              state
            }
          }
        }
      }
    }
  }
`

const PaymentProcessingForm: React.FC<Props> = ({
  amount,
  currency,
  recipient,
  txId,
  nextStep,
  closeDialog,
  windowRef,
}) => {
  const [polling, setPolling] = useState(true)
  const { data, error } = useQuery<ViewerTxState>(VIEWER_TX_STATE, {
    variables: { id: txId },
    pollInterval: polling ? 1000 : undefined,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: typeof window === 'undefined',
  })
  const txState = _get(data, 'viewer.wallet.transactions.edges.0.node.state')

  if (txState === 'succeeded') {
    nextStep()

    if (windowRef) {
      windowRef.close()
    }

    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <>
      {error ? (
        <PayToFallback closeDialog={closeDialog} />
      ) : (
        <>
          <Dialog.Header
            closeDialog={closeDialog}
            leftButton={<Dialog.Header.CloseButton closeDialog={closeDialog} />}
            title={'donation'}
          />
          <Dialog.Content>
            <section>
              <PaymentInfo
                amount={amount}
                currency={currency}
                recipient={recipient}
              />
              {currency === CURRENCY.HKD && (
                <p className="hint">
                  <Translate
                    zh_hant="交易進行中，請稍候..."
                    zh_hans="交易进行中，请稍候..."
                    en="Transaction in progress, please wait..."
                  />
                </p>
              )}
              {currency === CURRENCY.LIKE && (
                <p className="hint">
                  <p>
                    <Translate
                      zh_hant="請在 Liker Pay 頁面繼續操作"
                      zh_hans="请在 Liker Pay 页面继续操作"
                      en="Please continue on the Liker Pay page"
                    />
                  </p>
                  <p>
                    <Translate
                      zh_hant="完成前請勿關閉此畫面"
                      zh_hans="完成前请勿关闭此画面"
                      en="Do not close this screen until done"
                    />
                  </p>
                </p>
              )}
              <Spinner />
              <style jsx>{styles}</style>
            </section>
          </Dialog.Content>
        </>
      )}
    </>
  )
}

export default PaymentProcessingForm
