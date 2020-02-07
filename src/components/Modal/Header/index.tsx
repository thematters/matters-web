import { Button, Icon } from '~/components'
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
          <Button
            onClick={() => {
              if (close) {
                close()
              } else {
                defaultClose()
              }
            }}
          >
            <Icon.Clear size="md" color="grey-dark" />
          </Button>
        )}

        <style jsx>{styles}</style>
      </header>
    )}
  </ModalContext.Consumer>
)

export default ModalHeader
