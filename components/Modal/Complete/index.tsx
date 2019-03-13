import styles from './styles.css'

const ModalComplete = ({
  message,
  hint
}: {
  message?: React.ReactNode | string
  hint?: React.ReactNode | string
}) => (
  <div className="complete">
    <div className="message">{message}</div>
    <div className="hint">{hint}</div>
    <style jsx>{styles}</style>
  </div>
)

export default ModalComplete
