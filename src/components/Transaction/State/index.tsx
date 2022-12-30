import { featureSupportedChains } from '~/common/utils'
import {
  Button,
  IconExternalLink16,
  IconInfo16,
  TextIcon,
  Tooltip,
  Translate,
} from '~/components'
import { DigestTransactionFragment, TransactionState } from '~/gql/graphql'

import styles from './styles.css'

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
  message: string | null
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
        bgColor="grey-lighter"
        htmlHref={`${explorerUrl}/tx/${blockchainTx.txHash}`}
        htmlTarget="_blank"
        onClick={(event) => event?.stopPropagation()}
      >
        <TextIcon
          icon={<IconExternalLink16 color="grey" size="sm" />}
          spacing="xxtight"
          size="xs"
          weight="md"
          color="grey"
          textPlacement="left"
        >
          <Translate
            zh_hant="查看鏈上紀錄"
            zh_hans="查看链上纪录"
            en="View on-chain records"
          />
        </TextIcon>
      </Button>
    )
  }

  const StateIcon = () => {
    if (message) {
      return (
        <Tooltip content={message}>
          <span onClick={(event) => event.stopPropagation()}>
            <IconInfo16 />
          </span>
        </Tooltip>
      )
    }

    return null
  }

  const StateText = () => {
    switch (state) {
      case TransactionState.Canceled:
        return <Translate id="cancel" />
      case TransactionState.Failed:
        return <Translate zh_hant="失敗" zh_hans="失敗" en="Failed" />
      case TransactionState.Pending:
        return <Translate zh_hant="進行中…" zh_hans="进行中…" en="Processing" />
      default:
        return null
    }
  }

  return (
    <section>
      <TextIcon
        icon={<StateIcon />}
        spacing="xxxtight"
        size="xs"
        weight="md"
        color="grey"
        textPlacement="left"
      >
        <StateText />
      </TextIcon>

      <style jsx>{styles}</style>
    </section>
  )
}

export default State
