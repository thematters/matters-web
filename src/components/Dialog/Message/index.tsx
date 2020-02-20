import { Dialog } from '~/components'

import styles from './styles.css'

interface DialogMessageProps {
  headline?: React.ReactNode | string
  description?: React.ReactNode | string
}

const DialogMessage: React.FC<DialogMessageProps> = ({
  headline,
  description,
  children
}) => (
  <Dialog.Content spacing={['xloose', 'base']}>
    {headline && <h3 className="headline">{headline}</h3>}

    {description && <section className="description">{description}</section>}

    {children}

    <style jsx>{styles}</style>
  </Dialog.Content>
)

export default DialogMessage
