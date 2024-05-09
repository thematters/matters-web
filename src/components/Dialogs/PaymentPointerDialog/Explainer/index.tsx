import { FormattedMessage } from 'react-intl'

import styles from './styles.module.css'

const PaymentPointerExplainer = () => (
  <>
    <p className={styles.content}>
      <FormattedMessage
        defaultMessage="{link1}: In order to increase the sources of income for creators, Matters introduced {link2} and {link3}, enabling the payer and the payee to conduct transactions in different currencies. Through {link4}, and other services you can acqure a {link6}, and receive payments from {link7}, applicable on both Matters website and IPFS."
        id="0HdNPs"
        values={{
          link1: (
            <a href="https://interledger.org/" target="_blank" rel="noreferrer">
              <FormattedMessage
                defaultMessage="Interledger Protocol"
                id="Is5PqP"
              />
            </a>
          ),
          link2: (
            <a href="https://interledger.org/" target="_blank" rel="noreferrer">
              <FormattedMessage
                defaultMessage="Interledger Protocol"
                id="Is5PqP"
              />
            </a>
          ),
          link3: (
            <a
              href="https://webmonetization.org/"
              target="_blank"
              rel="noreferrer"
            >
              <FormattedMessage
                defaultMessage="Web Monetization standard"
                id="WiGHyF"
              />
            </a>
          ),
          link4: (
            <a href="https://uphold.com/" target="_blank" rel="noreferrer">
              Uphold
            </a>
          ),
          link5: (
            <a href="https://gatehub.net" target="_blank" rel="noreferrer">
              GateHub
            </a>
          ),
          link6: (
            <a
              href="https://webmonetization.org/docs/ilp-wallets"
              target="_blank"
              rel="noreferrer"
            >
              <FormattedMessage defaultMessage="wallet address" id="vyG38g" />
            </a>
          ),
          link7: (
            <a href="https://coil.com" target="_blank" rel="noreferrer">
              Coil
            </a>
          ),
        }}
      />
    </p>
  </>
)

export default PaymentPointerExplainer
