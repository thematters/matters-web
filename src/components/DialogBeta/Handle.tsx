import { useIntl } from 'react-intl'

import styles from './styles.module.css'

interface HandleProps {
  closeDialog: () => void
}

const Handle: React.FC<HandleProps> = ({ closeDialog, ...props }) => {
  const intl = useIntl()

  return (
    <button
      type="button"
      className={styles.handle}
      aria-label={intl.formatMessage({ defaultMessage: 'Close' })}
      onClick={closeDialog}
      {...props}
    >
      <span className={styles.icon} />
    </button>
  )
}

export default Handle
