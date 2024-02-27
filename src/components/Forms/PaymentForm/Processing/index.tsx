import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { parseUnits } from 'viem'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import {
  CHAIN,
  contract,
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS_ANIMATION,
} from '~/common/enums'
import { CurationABI } from '~/common/utils'
import {
  Dialog,
  Spinner,
  Translate,
  useBalanceUSDT,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateDonation } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'
import {
  ArticleDetailPublicQuery,
  PayToMutation,
  UserDonationRecipientFragment,
  ViewerTxStateQuery,
} from '~/gql/graphql'

import PaymentInfo from '../PaymentInfo'
import PayToFallback from './PayToFallback'
import styles from './styles.module.css'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
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
  const { data, error, startPolling, stopPolling } =
    useQuery<ViewerTxStateQuery>(VIEWER_TX_STATE, {
      variables: { id: txId },
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    })
  const txState = _get(data, 'viewer.wallet.transactions.edges.0.node.state')

  const succeededFn = () => {
    nextStep()
    window.dispatchEvent(
      new CustomEvent(SUPPORT_SUCCESS_ANIMATION, {
        detail: {
          currency,
        },
      })
    )

    if (windowRef) {
      windowRef.close()
    }
  }

  useEffect(() => {
    if (error) {
      stopPolling()
    } else {
      startPolling(1000)
    }

    return () => {}
  }, [error])

  useEffect(() => {
    if (txState === 'succeeded') {
      if (currency === CURRENCY.HKD) {
        setTimeout(() => {
          succeededFn()
        }, 3 * 1000)
      } else {
        succeededFn()
      }
    }
  }, [txState])

  return (
    <>
      {error ? (
        <PayToFallback closeDialog={closeDialog} />
      ) : (
        <>
          <Dialog.Header
            title={
              <FormattedMessage defaultMessage="Support Author" id="ezYuE2" />
            }
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
                <p className={styles.hint}>
                  <Translate
                    zh_hant="交易進行中，請稍候..."
                    zh_hans="交易进行中，请稍候..."
                    en="Transaction in progress, please wait..."
                  />
                </p>
              )}
              {currency === CURRENCY.LIKE && (
                <p className={styles.hint}>
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
  const [payTo] = useMutation<PayToMutation>(PAY_TO)
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
    address: contract.Optimism.curationAddress,
    abi: CurationABI,
    functionName: 'curate',
    args: [
      recipient.info.ethAddress as `0x${string}`,
      contract.Optimism.tokenAddress,
      parseUnits(amount.toString() as `${number}`, balanceUSDTData?.decimals!),
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
        chain: CHAIN.OPTIMISM,
        txHash: data.hash,
      },
      update: (cache) => {
        updateDonation({
          cache,
          id: article.id,
          viewer,
        })
      },
    })

    await waitForTransaction({ hash: data.hash })

    window.dispatchEvent(
      new CustomEvent(SUPPORT_SUCCESS_ANIMATION, {
        detail: {
          transactionResult: data,
          amount,
          currency,
          recipientId: recipient.id,
          targetId,
        },
      })
    )

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
        closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
        title={<FormattedMessage defaultMessage="Support Author" id="ezYuE2" />}
      />

      <Dialog.Content>
        <section>
          <PaymentInfo
            amount={amount}
            currency={currency}
            recipient={recipient}
            showEthAddress={true}
          />
          <section className={styles.hint}>
            <p>
              <Translate
                zh_hant="請在加密錢包內繼續操作，"
                zh_hans="请在加密钱包内继续操作，"
                en="Continue in the wallet."
              />
            </p>
            <p>
              <Translate
                zh_hant="結果以鏈上紀錄為主，稍後同步至 Matters"
                zh_hans="结果以链上记录为主，稍后同步至 Matters"
                en="Transaction will be updated to Matters shortly."
              />
            </p>
          </section>
          <Spinner />
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
    </>
  )
}

export default PaymentProcessingForm
