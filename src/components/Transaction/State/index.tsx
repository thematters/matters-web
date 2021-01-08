import { IconInfo16, TextIcon, Tooltip, Translate } from '~/components'

import styles from './styles.css'

import { TransactionState } from '@/__generated__/globalTypes'

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
}

const State = ({ state, message }: StateProps) => {
  if (!state || state === TransactionState.succeeded) {
    return null
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
      case TransactionState.canceled:
        return <Translate id="cancel" />
      case TransactionState.failed:
        return <Translate zh_hant="失敗" zh_hans="失敗" />
      case TransactionState.pending:
        return <Translate zh_hant="進行中…" zh_hans="进行中…" />
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
