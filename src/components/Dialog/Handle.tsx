import { useContext } from 'react'

import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'

import styles from './styles.css'

interface HandleProps {
  closeDialog: () => void
}

const Handle: React.FC<HandleProps> = ({ closeDialog, ...props }) => {
  const { lang } = useContext(LanguageContext)

  return (
    <button
      type="button"
      className="handle"
      aria-label={translate({ id: 'close', lang })}
      onClick={closeDialog}
      {...props}
    >
      <span className="icon" />

      <style jsx>{styles}</style>
    </button>
  )
}

export default Handle
