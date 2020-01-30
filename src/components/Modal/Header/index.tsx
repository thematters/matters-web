import { Icon } from '~/components'
import { ModalContext } from '~/components/ModalManager'
import { Title } from '~/components/Title'

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
            <Icon.Clear size="md" color="black" />
          </button>
        )}

        <style jsx>{styles}</style>
      </header>
    )}
  </ModalContext.Consumer>
)

export default ModalHeader
