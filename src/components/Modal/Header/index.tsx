import { Icon } from '~/components/Icon'
import { ModalContext } from '~/components/ModalManager'
import { Title } from '~/components/Title'

import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

interface ModalHeaderProps {
  title: string | React.ReactNode
  close?: () => void
  closeable?: boolean
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  close,
  closeable = true,
  children
}) => (
  <ModalContext.Consumer>
    {({ close: defaultClose }) => (
      <header>
        <Title type="modal">{title || children}</Title>
        {closeable && (
          <button
            onClick={() => {
              if (close) {
                close()
              } else {
                defaultClose()
              }
            }}
          >
            <Icon
              id={ICON_CLOSE.id}
              viewBox={ICON_CLOSE.viewBox}
              color="black"
            />
          </button>
        )}

        <style jsx>{styles}</style>
      </header>
    )}
  </ModalContext.Consumer>
)

export default ModalHeader
