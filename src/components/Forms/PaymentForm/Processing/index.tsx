import { useQuery } from '@apollo/react-hooks'
import { ethers } from 'ethers'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useEffect, useState } from 'react'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'

import {
  Dialog,
  Spinner,
  Translate,
  useBalanceUSDT,
  useMutation,
  ViewerContext,
} from '~/components'
import PAY_TO from '~/components/GQL/mutations/payTo'

import { CHAIN, PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { curationABI } from '~/common/utils'

import PaymentInfo from '../PaymentInfo'
import PayToFallback from './PayToFallback'
import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { PayTo as PayToMutate } from '~/components/GQL/mutations/__generated__/PayTo'
import { ArticleDetailPublic_article } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'
import { ViewerTxState } from './__generated__/ViewerTxState'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  article?: ArticleDetailPublic_article
  targetId: string
  txId: string
  nextStep: () => void
  closeDialog: () => void
  windowRef?: Window
  switchToConfirm: () => void
  switchToCurrencyChoice: () => void
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
            title="donation"
          />
          <Dialog.Content>
            <section>
              <PaymentInfo
                amount={amount}
                currency={currency}
                recipient={recipient}
                showLikerID={currency === CURRENCY.LIKE}
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
  targetId,
  article,
  nextStep,
  closeDialog,
  switchToConfirm,
  switchToCurrencyChoice,
}) => {
  const [payTo] = useMutation<PayToMutate>(PAY_TO)

  const viewer = useContext(ViewerContext)
  const { address } = useAccount()
  const { data: balanceUSDTData } = useBalanceUSDT({})
  const { chain } = useNetwork()
  const isUnsupportedNetwork = !!chain?.unsupported
  const isConnectedAddress =
    viewer.info.ethAddress?.toLowerCase() === address?.toLowerCase()

  useEffect(() => {
    if (!address || isUnsupportedNetwork || !isConnectedAddress) {
      switchToCurrencyChoice()
    }
  }, [address, chain])

  const {
    data,
    error,
    isError,
    write: curate,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS || '',
    abi: curationABI,
    functionName: 'curate',
    args: [
      recipient.info.ethAddress as `0x${string}`,
      process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`,
      ethers.utils.parseUnits(amount.toString(), balanceUSDTData?.decimals),
      `ipfs://${article?.dataHash}`,
    ],
  })

  const sendPayTo = async () => {
    if (!data) {
      return
    }

    await payTo({
      variables: {
        amount,
        currency,
        purpose: 'donation',
        recipientId: recipient.id,
        targetId,
        chain: CHAIN.POLYGON,
        txHash: data.hash,
      },
    })

    await data.wait()

    nextStep()
  }

  // trigger transaction
  useEffect(() => {
    if (curate) {
      curate()
    }
  }, [])

  // trigger payTo mutation
  useEffect(() => {
    sendPayTo()
  }, [data])

  // error handling
  useEffect(() => {
    const code = _get(error, 'code')
    if (error && code === 'ACTION_REJECTED') {
      switchToConfirm()
    }
  }, [error])

  if (isError) {
    return <PayToFallback closeDialog={closeDialog} />
  }

  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        leftButton={<Dialog.Header.CloseButton closeDialog={closeDialog} />}
        title="donation"
      />
      <Dialog.Content>
        <section>
          <PaymentInfo
            amount={amount}
            currency={currency}
            recipient={recipient}
            showEthAddress={true}
          />
          <section className="hint">
            <p>
              <Translate
                zh_hant="請在加密錢包內繼續操作，完成前請勿關閉此畫面"
                zh_hans="请在加密钱包内继续操作，完成前请勿关闭此画面"
                en="Continue in the wallet. Do not close the window."
              />
            </p>
          </section>
          <Spinner />
          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>
    </>
  )
}

const PaymentProcessingForm: React.FC<Props> = ({
  amount,
  currency,
  recipient,
  article,
  targetId,
  txId,
  nextStep,
  closeDialog,
  windowRef,
  switchToConfirm,
  switchToCurrencyChoice,
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
          targetId={targetId}
          nextStep={nextStep}
          closeDialog={closeDialog}
          windowRef={windowRef}
          switchToConfirm={switchToConfirm}
          switchToCurrencyChoice={switchToCurrencyChoice}
        />
      )}
      {(currency === CURRENCY.LIKE || currency === CURRENCY.HKD) && (
        <OthersProcessingForm
          amount={amount}
          currency={currency}
          recipient={recipient}
          txId={txId}
          targetId={targetId}
          nextStep={nextStep}
          closeDialog={closeDialog}
          windowRef={windowRef}
          switchToConfirm={switchToConfirm}
          switchToCurrencyChoice={switchToCurrencyChoice}
        />
      )}
    </>
  )
}

export default PaymentProcessingForm
