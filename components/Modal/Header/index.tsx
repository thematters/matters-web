import { Icon } from '~/components/Icon'
import { ModalContext } from '~/components/ModalManager'
import { Title } from '~/components/Title'

import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

interface ModalHeaderProps {
  title: string | React.ReactNode
  closeable?: boolean
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  closeable = true,
  children
}) => (
  <ModalContext.Consumer>
    {({ close }) => (
      <header>
        <Title type="modal">{title || children}</Title>
        {closeable && (
          <button onClick={() => close()}>
            <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
          </button>
        )}
        <style jsx>{styles}</style>
      </header>
    )}
  </ModalContext.Consumer>
)

export default ModalHeader
