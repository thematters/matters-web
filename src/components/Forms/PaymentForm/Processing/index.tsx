import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { parseUnits } from 'viem'
import { useAccount, useContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import IconCircleTimes from '@/public/static/icons/24px/circle-times.svg'
import {
  CHAIN,
  contract,
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS_USDT_VISITOR,
} from '~/common/enums'
import {
  CurationABI,
  CurationVaultABI,
  fromGlobalId,
  toCurationVaultUID,
} from '~/common/utils'
import {
  Dialog,
  Icon,
  Spacer,
  SpinnerBlock,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import { updateArticlePublic } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'
import {
  ArticleDetailPublicQuery,
  PayToMutation,
  UserDonationRecipientFragment,
  ViewerTxStateQuery,
} from '~/gql/graphql'

import PaymentInfo from '../PaymentInfo'
import styles from './styles.module.css'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
  targetId: string
  txId: string
  prevStep: () => void
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
  prevStep,
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
    <section className={styles.container}>
      <PaymentInfo
        amount={amount}
        currency={currency}
        recipient={recipient}
        showLikerID={currency === CURRENCY.LIKE}
      >
        {error && (
          <>
            <Icon icon={IconCircleTimes} size={40} color="red" />
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="Sending failed. Please retry later."
                id="fK6ptv"
              />
              <br />
              <FormattedMessage
                defaultMessage="Check the wallet status and confirm your network."
                id="k6pcz/"
              />
            </p>
          </>
        )}

        {!error && (
          <>
            <SpinnerBlock />
            {currency === CURRENCY.HKD && (
              <p className={styles.hint}>
                <FormattedMessage
                  defaultMessage="Transaction in progress, please wait"
                  id="SebPdz"
                />
              </p>
            )}
            {currency === CURRENCY.LIKE && (
              <p className={styles.hint}>
                <p>
                  <FormattedMessage
                    defaultMessage="Please continue in Liker Land."
                    id="3yVvk4"
                  />
                </p>
                <p>
                  <FormattedMessage
                    defaultMessage="The result is mainly based on the records on the chain and will be synchronized to Matters later."
                    id="h9CB9m"
                  />
                </p>
              </p>
            )}
          </>
        )}
      </PaymentInfo>

      {error && (
        <>
          <Spacer size="sp24" />
          <Dialog.RoundedButton
            color="black"
            onClick={prevStep}
            borderColor="greyLight"
            borderWidth="sm"
            textWeight="normal"
            borderActiveColor="grey"
            text={<FormattedMessage defaultMessage="Retry" id="62nsdy" />}
          />
        </>
      )}
    </section>
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
  const { routerLang } = useRoute()

  const { address } = useAccount()
  const isConnectedAddress =
    viewer.info.ethAddress?.toLowerCase() === address?.toLowerCase()
  const [isInSufficientError, setIsInSufficientError] = useState(false)

  const [draftTxId, setDraftTxId] = useState<string>()

  const useCurationVault = !recipient.info.ethAddress
  const normalizedAmount = parseUnits(
    amount.toString() as `${number}`,
    contract.Optimism.tokenDecimals
  )
  const uri = article.dataHash
    ? `ipfs://${article.dataHash}`
    : window.location.href

  const {
    data: vaultData,
    error: vaultError,
    isError: isVaultError,
    write: curateVault,
  } = useContractWrite({
    address: contract.Optimism.curationVaultAddress,
    abi: CurationVaultABI,
    functionName: 'curate',
    args: [
      toCurationVaultUID(fromGlobalId(recipient.id).id),
      contract.Optimism.tokenAddress,
      normalizedAmount,
      uri,
    ],
  })

  const {
    data: curationData,
    error: curationError,
    isError: isCurationError,
    write: curateDirect,
  } = useContractWrite({
    address: contract.Optimism.curationAddress,
    abi: CurationABI,
    functionName: 'curate',
    args: [
      recipient.info.ethAddress as `0x${string}`,
      contract.Optimism.tokenAddress,
      normalizedAmount,
      uri,
    ],
  })

  const data = useCurationVault ? vaultData : curationData
  const error = useCurationVault ? vaultError : curationError
  const isError = useCurationVault ? isVaultError : isCurationError
  const curate = useCurationVault ? curateVault : curateDirect

  const payToData = {
    amount,
    currency,
    purpose: 'donation',
    recipientId: recipient.id,
    targetId,
    chain: CHAIN.OPTIMISM,
  }

  const sendOnChainTransaction = async () => {
    // make draft transaction
    const tx = await payTo({ variables: { ...payToData } })

    const txId = tx.data?.payTo.transaction.id
    if (txId) {
      setDraftTxId(txId)
    }

    // send on-chain transaction
    curate()
  }

  const sendPayTo = async () => {
    if (!data) {
      return
    }

    // settle draft transaction
    await payTo({
      variables: {
        ...payToData,
        txHash: data.hash,
        id: draftTxId,
      },
      update: (cache, result) => {
        updateArticlePublic({
          cache,
          shortHash: article.shortHash,
          viewer: isConnectedAddress ? viewer : undefined,
          routerLang,
          txId: result.data?.payTo.transaction.id,
          type: 'updateDonation',
        })
      },
    })

    await waitForTransaction({ hash: data.hash })

    window.dispatchEvent(
      new CustomEvent(SUPPORT_SUCCESS_USDT_VISITOR, {
        detail: { chain: CHAIN.OPTIMISM, txHash: data.hash },
      })
    )

    nextStep()
  }

  // trigger transaction
  useEffect(() => {
    if (!curate) return

    sendOnChainTransaction()
  }, [])

  // trigger payTo mutation
  useEffect(() => {
    sendPayTo()
  }, [data])

  // error handling
  useEffect(() => {
    const errorName = _get(error, 'cause.name')
    const reason = _get(error, 'cause.reason')
    if (error && errorName === 'UserRejectedRequestError') {
      switchToConfirm()
      return
    }

    if (error && reason === 'ERC20: transfer amount exceeds balance') {
      setIsInSufficientError(true)
    }
  }, [error])

  return (
    <>
      <section className={styles.container}>
        <PaymentInfo
          amount={amount}
          currency={currency}
          recipient={recipient}
          showEthAddress={!!recipient.info.ethAddress}
        >
          {!isError && (
            <>
              <SpinnerBlock noSpacing />
              <section className={styles.hint}>
                <p>
                  <FormattedMessage
                    defaultMessage="Please continue within your crypto wallet."
                    description="src/components/Forms/PaymentForm/Processing/index.tsx"
                    id="EmZFry"
                  />
                </p>
                <p>
                  <FormattedMessage
                    defaultMessage="The results are mainly based on the records on the chain and will be synchronized to Matters later."
                    description="src/components/Forms/PaymentForm/Processing/index.tsx"
                    id="sfj+KG"
                  />
                </p>
              </section>
            </>
          )}
          {isError && (
            <>
              <Icon icon={IconCircleTimes} size={40} color="red" />
              <p className={styles.hint}>
                {!isInSufficientError && (
                  <>
                    <FormattedMessage
                      defaultMessage="Sending failed. Please retry later."
                      id="fK6ptv"
                    />
                    <br />
                    <FormattedMessage
                      defaultMessage="Check the wallet status and confirm your network."
                      id="k6pcz/"
                    />
                  </>
                )}
                {isInSufficientError && (
                  <>
                    <FormattedMessage
                      defaultMessage="Insufficient balance, please make sure you have enough balance and retry"
                      id="zOXvqB"
                    />
                  </>
                )}
              </p>
            </>
          )}
        </PaymentInfo>
        {isError && (
          <>
            <Spacer size="sp24" />
            <Dialog.RoundedButton
              color="black"
              onClick={switchToConfirm}
              borderColor="greyLight"
              borderWidth="sm"
              textWeight="normal"
              borderActiveColor="grey"
              text={<FormattedMessage defaultMessage="Retry" id="62nsdy" />}
            />
          </>
        )}
      </section>
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
  prevStep,
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
          prevStep={prevStep}
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
          prevStep={prevStep}
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
