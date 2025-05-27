import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconOpenWallet from '@/public/static/icons/24px/open-wallet.svg'
import { GUIDE_LINKS } from '~/common/enums'
import { featureSupportedChains } from '~/common/utils'
import {
  Dialog,
  Icon,
  LanguageContext,
  SpinnerBlock,
  TextIcon,
  useTargetNetwork,
} from '~/components'

import styles from './styles.module.css'

interface SwitchNetworkProps {
  submitCallback: () => void
}

const SwitchNetwork: React.FC<SwitchNetworkProps> = ({ submitCallback }) => {
  const { lang } = useContext(LanguageContext)
  const targetNetork = featureSupportedChains.curation[0]
  const { isUnsupportedNetwork, switchToTargetNetwork, isSwitchingNetwork } =
    useTargetNetwork(targetNetork)

  const [showNote, setShowNote] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  const toggleNote = () => {
    setShowNote(!showNote)
  }

  useEffect(() => {
    if (!isUnsupportedNetwork) {
      submitCallback()
    }
    setShowLoading(false)
  }, [isUnsupportedNetwork])

  const noteClasses = classNames({
    [styles.note]: true,
  })

  if (showLoading) {
    return <SpinnerBlock />
  }

  return (
    <section className={styles.container}>
      <section className={styles.content}>
        <section className={styles.title}>
          <FormattedMessage
            defaultMessage="Switch to Optimism network now?"
            id="FWCa4O"
            description="src/components/Forms/PaymentForm/SwitchNetwork/index.tsx"
          />
        </section>
        <section className={styles.info}>
          <FormattedMessage
            defaultMessage="Switch to support creators with the Optimism network {br} Make support more convenient and affordable"
            id="iNZdM/"
            description="src/components/Forms/PaymentForm/SwitchNetwork/index.tsx"
            values={{ br: <br /> }}
          />
        </section>
        <Dialog.RoundedButton
          color="white"
          bgColor="green"
          onClick={switchToTargetNetwork}
          textWeight="normal"
          textSize={16}
          text={
            <TextIcon icon={<Icon icon={IconOpenWallet} size={20} />}>
              <FormattedMessage
                defaultMessage="Switch Network"
                id="U+qEBM"
                description="src/components/Forms/PaymentForm/SwitchNetwork/index.tsx"
              />
            </TextIcon>
          }
          loading={isSwitchingNetwork}
        />
      </section>
      <section className={styles.footer}>
        <section className={styles.buttons}>
          <button onClick={toggleNote}>
            <FormattedMessage
              defaultMessage="Why use Optimism network first?"
              id="SHWkv8"
              description="src/components/Forms/PaymentForm/SwitchNetwork/index.tsx"
            />
          </button>
        </section>
        {showNote && (
          <ol className={noteClasses} type="1">
            <li>
              <FormattedMessage
                defaultMessage="Optimism is a Layer 2 scaling solution based on Ethereum that can provide faster and cheaper transactions, while ensuring security, making it easier for you to support creators. "
                description="src/components/Forms/PaymentForm/SwitchNetwork/index.tsx"
                id="UxAA/V"
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="Optimism is a standalone blockchain. If you have USDT on other chains, you need to transfer them to Optimism. See details in the {tutorial}."
                description="src/components/Forms/PaymentForm/SwitchNetwork/index.tsx"
                id="TgU+Mf"
                values={{
                  tutorial: (
                    <a
                      href={GUIDE_LINKS.payment[lang]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="u-highlight"
                    >
                      <FormattedMessage
                        defaultMessage="tutorial"
                        id="HyjQns"
                        description="src/components/Forms/PaymentForm/SwitchNetwork/index.tsx"
                      />
                    </a>
                  ),
                }}
              />
            </li>
          </ol>
        )}
      </section>
    </section>
  )
}

export default SwitchNetwork
