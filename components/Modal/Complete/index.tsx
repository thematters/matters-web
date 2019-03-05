import styles from './styles.css'

const ModalComplete = ({ message, hint }: { message?: any; hint?: any }) => (
  <>
    <div className="complete">
      <div className="message">{message}</div>
      <div className="hint">{hint}</div>
    </div>
    <style jsx>{styles}</style>
  </>
)

export default ModalComplete
