import { useIntl } from 'react-intl'
import { useSwipeable } from 'react-swipeable'

import styles from './styles.module.css'

interface HandleProps {
  closeDialog: () => void
}

const Handle: React.FC<HandleProps> = ({ closeDialog }) => {
  const intl = useIntl()

  const handlers = useSwipeable({
    onSwipedDown: () => closeDialog(),
  })

  return (
    <button
      type="button"
      className={styles.handle}
      aria-label={intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
      onClick={closeDialog}
      {...handlers}
    >
      <span className={styles.icon} />
    </button>
  )
}

export default Handle
