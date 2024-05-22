import { useIntl } from 'react-intl'

import styles from './styles.module.css'

interface HandleProps {
  closeDialog: () => void
}

const Handle: React.FC<HandleProps> = ({ closeDialog, ...restProps }) => {
  const intl = useIntl()

  return (
    <button
      type="button"
      className={styles.handle}
      aria-label={intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
      onClick={closeDialog}
      {...restProps}
    >
      <span className={styles.icon} />
    </button>
  )
}

export default Handle
