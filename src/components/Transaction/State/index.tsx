import { IconInfo, IconMore, TextIcon, Translate } from '~/components'

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
  state: string | null
}

const State = ({ state }: StateProps) => {
  if (!state || state === 'succeeded') {
    return null
  }

  // canceled, failed and pending
  const StateIcon = () => {
    switch (state) {
      case 'canceled':
      case 'failed':
        return <IconInfo />
      case 'pending':
        return <IconMore />
      default:
        return null
    }
  }
  const StateText = () => {
    switch (state) {
      case 'canceled':
        return <Translate id="cancel" />
      case 'failed':
        return <Translate zh_hant="失敗" zh_hans="失敗" />
      case 'pending':
        return <Translate zh_hant="進行中" zh_hans="进行中" />
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
