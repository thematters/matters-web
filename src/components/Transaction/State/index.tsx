import { FormattedMessage } from 'react-intl'

import IconExternal from '@/public/static/icons/24px/external.svg'
import IconInfo from '@/public/static/icons/24px/information.svg'
import { explorers } from '~/common/utils'
import { Button, Icon, TextIcon, Tooltip } from '~/components'
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
    const explorerUrl = explorers[blockchainTx.chain].url

    return (
      <Button
        spacing={[4, 12]}
        htmlHref={`${explorerUrl}/tx/${blockchainTx.txHash}`}
        htmlTarget="_blank"
        onClick={(event) => event?.stopPropagation()}
      >
        <TextIcon
          icon={<Icon icon={IconExternal} color="grey" size={12} />}
          spacing={4}
          size={12}
          weight="medium"
          color="grey"
          placement="left"
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
          <Icon icon={IconInfo} size={12} />
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
        spacing={4}
        size={12}
        weight="normal"
        color={state === TransactionState.Failed ? 'red' : 'greyDark'}
        placement="left"
      >
        <span className={styles.stateText}>
          <StateText />
        </span>
      </TextIcon>
    </section>
  )
}

export default State
