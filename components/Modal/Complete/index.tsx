import { Title } from '~/components/Title'

import styles from './styles.css'

const ModalComplete = ({
  message,
  hint
}: {
  message?: React.ReactNode | string
  hint?: React.ReactNode | string
}) => (
  <div className="complete">
    <Title is="h3" type="modal-headline">
      {message}
    </Title>
    <p className="hint">{hint}</p>
    <style jsx>{styles}</style>
  </div>
)

export default ModalComplete
