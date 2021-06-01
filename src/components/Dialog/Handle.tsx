import { TEXT } from '~/common/enums'

import styles from './styles.css'

interface HandleProps {
  closeDialog: () => void
}

const Handle: React.FC<HandleProps> = ({ closeDialog, ...props }) => (
  <button
    type="button"
    className="handle"
    aria-label={TEXT.zh_hant.close}
    onClick={closeDialog}
    {...props}
  >
    <span className="icon" />

    <style jsx>{styles}</style>
  </button>
)

export default Handle
