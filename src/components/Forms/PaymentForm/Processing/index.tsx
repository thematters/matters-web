import { useQuery } from '@apollo/react-hooks'
import { BigNumber } from 'ethers/lib/ethers'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useContractWrite } from 'wagmi'

import { Dialog, Spinner, Translate } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import { curationABI } from '@/src/common/utils/contract'

import PaymentInfo from '../PaymentInfo'
import PayToFallback from './PayToFallback'
import styles from './styles.css'

import { UserDonationRecipient } from '@/src/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { ArticleDetailPublic_article } from '@/src/views/ArticleDetail/__generated__/ArticleDetailPublic'
import { ViewerTxState } from './__generated__/ViewerTxState'
// import { PayTo as PayToMutate } from '~/components/GQL/mutations/__generated__/PayTo'

// import PAY_TO from '~/components/GQL/mutations/payTo'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  article?: ArticleDetailPublic_article
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

const OthersProcessingForm: React.FC<Props> = ({
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

const USDTProcessingForm: React.FC<Props> = ({
  amount,
  currency,
  recipient,
  article,
  nextStep,
  closeDialog,
}) => {
  // const { data, isError, write } = useCurate()
  const { data, isError, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS || '',
    abi: curationABI,
    functionName: 'curate',
    args: [
      `0x${recipient.info.ethAddress?.slice(2)}`,
      `0x${process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS?.slice(2)}`,
      BigNumber.from(amount),
      `ipfs://${article?.dataHash}`,
    ],
  })

  // const [payTo] = useMutation<PayToMutate>(PAY_TO)

  useEffect(() => {
    // write({
    //   recklesslySetUnpreparedArgs: [
    //     `0x${recipient.info.ethAddress?.slice(2)}`,
    //     `0x${process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS?.slice(2)}`,
    //     BigNumber.from(amount),
    //     window.location.href,
    //   ],
    // })

    // tslint:disable-next-line: no-unused-expression
    write && write()
  }, [])

  const f = async () => {
    if (data) {
      // const { hash } = data
      // const result = await payTo({
      //   variables: {
      //     amount,
      //     currency,
      //     purpose: 'donation',
      //     recipientId: recipient.id,
      //     chain: CHAIN.POLYGON,
      //     txHash: hash,
      //   },
      // })
      // console.log({ result })
      // const redirectUrl = result?.data?.payTo.redirectUrl
      // const transaction = result?.data?.payTo.transaction
      // if (!redirectUrl || !transaction) {
      //   throw new Error()
      // }
      await data.wait()
      nextStep()
    }
  }

  useEffect(() => {
    f()
  }, [data])

  return (
    <>
      {isError ? (
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
              <section className="hint">
                <p>
                  <Translate
                    zh_hant="請在加密錢包內繼續操作"
                    zh_hans="请在加密钱包内继续操作"
                    en="Please continue within the encrypted wallet"
                  />
                </p>
                <p>
                  <Translate
                    zh_hant="完成前請勿關閉此畫面"
                    zh_hans="完成前请勿关闭此画面"
                    en="Do not close this screen until done"
                  />
                </p>
              </section>
              <Spinner />
              <style jsx>{styles}</style>
            </section>
          </Dialog.Content>
        </>
      )}
    </>
  )
}

const PaymentProcessingForm: React.FC<Props> = ({
  amount,
  currency,
  recipient,
  article,
  txId,
  nextStep,
  closeDialog,
  windowRef,
}) => {
  return (
    <>
      {currency === CURRENCY.USDT && (
        <USDTProcessingForm
          amount={amount}
          currency={currency}
          recipient={recipient}
          article={article}
          txId={txId}
          nextStep={nextStep}
          closeDialog={closeDialog}
          windowRef={windowRef}
        />
      )}
      {(currency === CURRENCY.LIKE || currency === CURRENCY.HKD) && (
        <OthersProcessingForm
          amount={amount}
          currency={currency}
          recipient={recipient}
          txId={txId}
          nextStep={nextStep}
          closeDialog={closeDialog}
          windowRef={windowRef}
        />
      )}
    </>
  )
}

export default PaymentProcessingForm
