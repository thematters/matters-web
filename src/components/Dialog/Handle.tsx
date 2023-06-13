import { useContext } from 'react'

import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'

import styles from './styles.module.css'

interface HandleProps {
  closeDialog: () => void
}

const Handle: React.FC<HandleProps> = ({ closeDialog, ...props }) => {
  const { lang } = useContext(LanguageContext)

  return (
    <button
      type="button"
      className={styles.handle}
      aria-label={translate({ id: 'close', lang })}
      onClick={closeDialog}
      {...props}
    >
      <span className={styles.icon} />
    </button>
  )
}

export default Handle
