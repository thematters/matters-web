import { FormattedMessage } from 'react-intl'

import { featureSupportedChains } from '~/common/utils'
import {
  Button,
  IconExternalLink16,
  IconInfo16,
  TextIcon,
  Tooltip,
} from '~/components'
import { DigestTransactionFragment, TransactionState } from '~/gql/graphql'

import styles from './styles.module.css'

/***
 * This is a sub component of Transaction that presents canceled, failed
 * and pending state of it with specific state icon.
 *
 * Usage:
 *
 * ```tsx
 *  <State state={state} />
 * ```
 */
interface StateProps {
  state: TransactionState
  message?: string | null
  blockchainTx: DigestTransactionFragment['blockchainTx'] | null
}

const State = ({ state, message, blockchainTx }: StateProps) => {
  if (!state) {
    return null
  }

  if (state === TransactionState.Succeeded && !!blockchainTx) {
    const targetNetwork = featureSupportedChains.curation[0]
    const explorerUrl = targetNetwork.blockExplorers?.default.url!

    return (
      <Button
        spacing={['xxtight', 'tight']}
        htmlHref={`${explorerUrl}/tx/${blockchainTx.txHash}`}
        htmlTarget="_blank"
        onClick={(event) => event?.stopPropagation()}
      >
        <TextIcon
          icon={<IconExternalLink16 color="grey" size="xs" />}
          spacing="xxtight"
          size="xs"
          weight="md"
          color="grey"
          textPlacement="left"
        >
          <FormattedMessage defaultMessage="On-chain records" id="6kMb9Z" />
        </TextIcon>
      </Button>
    )
  }

  const StateIcon = () => {
    if (!message) {
      return null
    }

    return (
      <Tooltip content={message}>
        <button
          type="button"
          aria-hidden
          onClick={(event) => event.stopPropagation()}
        >
          <IconInfo16 size="xs" />
        </button>
      </Tooltip>
    )
  }

  const StateText = () => {
    switch (state) {
      case TransactionState.Canceled:
        return (
          <FormattedMessage
            defaultMessage="Cancelled"
            id="6uavsa"
            description="src/components/Transaction/State/index.tsx"
          />
        )
      case TransactionState.Failed:
        return (
          <FormattedMessage
            defaultMessage="Failed"
            id="1COpAA"
            description="src/components/Transaction/State/index.tsx"
          />
        )
      case TransactionState.Pending:
        return (
          <FormattedMessage
            defaultMessage="Processing"
            id="awW+lk"
            description="src/components/Transaction/State/index.tsx"
          />
        )
      default:
        return null
    }
  }

  return (
    <section className={styles.content}>
      <TextIcon
        icon={<StateIcon />}
        spacing="xxtight"
        size="xs"
        weight="normal"
        color={state === TransactionState.Failed ? 'red' : 'greyDark'}
        textPlacement="left"
      >
        <span className={styles.stateText}>
          <StateText />
        </span>
      </TextIcon>
    </section>
  )
}

export default State
