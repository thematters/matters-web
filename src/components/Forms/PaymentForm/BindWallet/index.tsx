import classNames from 'classnames'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAccount } from 'wagmi'

import {
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS_ANIMATION,
} from '~/common/enums'
import { Button, IconOpenWallet20, TextIcon, ViewerContext } from '~/components'
import { Dialog } from '~/components/Dialog'

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

  return (
    <section className={styles.container}>
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
          onClick={() => {}}
          textWeight="normal"
          textSize="md"
          text={
            <TextIcon icon={<IconOpenWallet20 size="mdS" />}>
              <FormattedMessage
                defaultMessage="Go to sign"
                id="P3y9Bo"
                description="src/components/Forms/PaymentForm/BindWallet/index.tsx"
              />
            </TextIcon>
          }
          // TODO: add loading prop
          // loading={isSwitchingNetwork}
        />
        <section className={styles.passButton}>
          <Button
            textColor="greyDarker"
            textActiveColor="black"
            onClick={gotIt}
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
    </section>
  )
}

export default BindWallet
