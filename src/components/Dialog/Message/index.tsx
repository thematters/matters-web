import { Dialog, Title } from '~/components'

import styles from './styles.css'

const DialogMessage = ({
  message,
  hint
}: {
  message?: React.ReactNode | string
  hint?: React.ReactNode | string
}) => (
  <Dialog.Content>
    <Title is="h3" type="dialog-headline">
      {message}
    </Title>

    <p className="hint">
      {hint}
      <style jsx>{styles}</style>
    </p>
  </Dialog.Content>
)

export default DialogMessage
