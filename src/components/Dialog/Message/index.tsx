import { Dialog, Title } from '~/components'

import styles from './styles.css'

interface DialogMessageProps {
  message?: React.ReactNode | string
  hint?: React.ReactNode | string
}

const DialogMessage: React.FC<DialogMessageProps> = ({
  message,
  hint,
  children
}) => (
  <Dialog.Content spacing={['xxxloose', 'xxxloose']}>
    <Title is="h3" type="dialog-headline">
      {message}
    </Title>

    <section className="hint">
      {hint}

      <style jsx>{styles}</style>
    </section>

    {children}
  </Dialog.Content>
)

export default DialogMessage
