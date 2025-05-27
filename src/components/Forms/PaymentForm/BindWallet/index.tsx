import classNames from 'classnames'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAccount, useSignMessage } from 'wagmi'

import IconCircleCheck from '@/public/static/icons/24px/circle-check.svg'
import IconCircleTimes from '@/public/static/icons/24px/circle-times.svg'
import IconOpenWallet from '@/public/static/icons/24px/open-wallet.svg'
import {
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS_ANIMATION,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Button,
  Icon,
  TextIcon,
  useMutation,
  ViewerContext,
} from '~/components'
import { Dialog } from '~/components/Dialog'
import { GENERATE_SIGNING_MESSAGE } from '~/components/GQL/mutations/generateSigningMessage'
import { ADD_WALLET_LOGIN } from '~/components/GQL/mutations/walletLogin'
import {
  AddWalletLoginMutation,
  GenerateSigningMessageMutation,
} from '~/gql/graphql'

import PaymentInfo from '../PaymentInfo'
import styles from './styles.module.css'

interface Props {
  currency: CURRENCY
  callback?: () => void
}

const BindWallet: React.FC<Props> = ({ currency, callback }) => {
  const { address } = useAccount()
  const viewer = useContext(ViewerContext)

  const [showNote, setShowNote] = useState(false)

  const { signMessageAsync } = useSignMessage()
  const [signing, setSigning] = useState(false)
  const [bindState, setBindState] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )
  const isBindIdle = bindState === 'idle'
  const isBindSuccess = bindState === 'success'
  const isBindError = bindState === 'error'
  const [generateSigningMessage] = useMutation<GenerateSigningMessageMutation>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    { showToast: false }
  )

  const [addWalletLogin] = useMutation<AddWalletLoginMutation>(
    ADD_WALLET_LOGIN,
    undefined,
    {
      showToast: false,
    }
  )

  const toggleNote = () => {
    setShowNote(!showNote)
  }

  const noteClasses = classNames({
    [styles.note]: true,
  })

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

  const gotoSign = async () => {
    if (!address) {
      return
    }

    setSigning(true)
    // get signing message
    const { data: signingMessageData } = await generateSigningMessage({
      variables: { input: { address, purpose: 'connect' } },
    })

    const signingMessage = signingMessageData?.generateSigningMessage

    if (!signingMessage) {
      setSigning(false)
      setBindState('error')
      return
    }

    // let user sign the message
    let signature = ''
    try {
      signature = await signMessageAsync({
        message: signingMessage.signingMessage,
      })
    } catch (err) {
      setSigning(false)
      setBindState('error')
      return
    }

    const variables = {
      input: {
        ethAddress: address,
        nonce: signingMessage.nonce,
        signedMessage: signingMessage.signingMessage,
        signature,
      },
    }

    await addWalletLogin({ variables })
    setSigning(false)
    setBindState('success')
  }

  return (
    <section className={styles.container}>
      {isBindIdle && (
        <>
          <section className={styles.content}>
            <section className={styles.title}>
              <FormattedMessage
                defaultMessage="Bind your wallet immediately, and link it to your personal account"
                id="v4ddaP"
                description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
              />
            </section>
            <section className={styles.info}>
              <FormattedMessage
                defaultMessage="You can quickly log in to your account after binding.{br}Readers can also freely transfer money through other channels to support you!"
                id="vRCDr8"
                description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
                values={{ br: <br /> }}
              />
            </section>
            <PaymentInfo
              recipient={viewer}
              isInBindWallet
              showEthAddress={address !== null}
              address={address}
            />
            <Dialog.RoundedButton
              color="white"
              bgColor="green"
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'bind_wallet_after_support',
                  pageType: 'article_detail',
                })
                gotoSign()
              }}
              textWeight="normal"
              textSize={16}
              text={
                <TextIcon icon={<Icon icon={IconOpenWallet} size={20} />}>
                  <FormattedMessage
                    defaultMessage="Go to sign"
                    id="P3y9Bo"
                    description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
                  />
                </TextIcon>
              }
              loading={signing}
            />
            <section className={styles.passButton}>
              <Button
                textColor="greyDarker"
                textActiveColor="black"
                onClick={gotIt}
                disabled={signing}
              >
                <FormattedMessage
                  defaultMessage="Pass and ask me next time"
                  id="myB890"
                  description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
                />
              </Button>
            </section>
          </section>
          <section className={styles.footer}>
            <section className={styles.buttons}>
              <button onClick={toggleNote}>
                <FormattedMessage
                  defaultMessage="Why need to set up a wallet?"
                  id="NACY16"
                  description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
                />
              </button>
            </section>
            {showNote && (
              <ol className={noteClasses} type="1">
                <li>
                  <FormattedMessage
                    defaultMessage="After binding, in addition to the original login method, a wallet login channel will be added."
                    description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
                    id="uaFED8"
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="The wallet address will be publicly displayed on the personal page as personal identification."
                    description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
                    id="dk+TLh"
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Readers can directly transfer USDT and other currencies to you through their wallet address."
                    description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
                    id="HQusql"
                  />
                </li>
              </ol>
            )}
          </section>
        </>
      )}
      {isBindSuccess && (
        <section className={styles.content}>
          <section className={styles.resultTitle}>
            <FormattedMessage
              defaultMessage="Wallet successfully bound"
              id="DX0YH3"
              description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
            />
          </section>
          <section className={styles.resultIcon}>
            <Icon icon={IconCircleCheck} size={40} color="green" />
          </section>
          <section className={styles.resultInfo}>
            <FormattedMessage
              defaultMessage="You can log in through your wallet next time!"
              id="exb/12"
              description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
            />
          </section>
          <Dialog.RoundedButton
            color="black"
            onClick={gotIt}
            borderColor="greyLight"
            borderWidth="sm"
            textWeight="normal"
            borderActiveColor="grey"
            text={<FormattedMessage defaultMessage="Got it" id="NYTGIb" />}
          />
        </section>
      )}
      {isBindError && (
        <section className={styles.content}>
          <section className={styles.resultTitle}>
            <FormattedMessage
              defaultMessage="Unable to bind wallet"
              id="jiB0Z2"
              description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
            />
          </section>
          <section className={styles.resultIcon}>
            <Icon icon={IconCircleTimes} size={40} color="red" />
          </section>
          <section className={styles.resultInfo}>
            <FormattedMessage
              defaultMessage="Binding failed. Please retry later."
              id="XnEruT"
            />
            <br />
            <FormattedMessage
              defaultMessage="Check the wallet status and confirm your network."
              id="k6pcz/"
            />
          </section>
          <Dialog.RoundedButton
            color="black"
            onClick={() => setBindState('idle')}
            borderColor="greyLight"
            borderWidth="sm"
            textWeight="normal"
            borderActiveColor="grey"
            text={<FormattedMessage defaultMessage="Retry" id="62nsdy" />}
          />
        </section>
      )}
    </section>
  )
}

export default BindWallet
