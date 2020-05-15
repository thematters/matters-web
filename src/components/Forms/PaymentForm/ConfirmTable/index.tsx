import classNames from 'classnames'

import styles from './styles.css'

interface RowProps {
  total?: boolean
  insufficient?: boolean
  breaker?: boolean
}

const Row: React.FC<RowProps> = ({
  total,
  insufficient,
  breaker,
  children,
}) => {
  const rowClass = classNames({
    row: true,
    total,
    insufficient,
    breaker,
  })

  return (
    <section className={rowClass}>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

const Col: React.FC = ({ children }) => (
  <section className="col">
    {children}
    <style jsx>{styles}</style>
  </section>
)

const ConfirmTable: React.FC & {
  Row: typeof Row
  Col: typeof Col
} = ({ children }) => (
  <section className="confirm-table">
    {children}
    <style jsx>{styles}</style>
  </section>
)

ConfirmTable.Row = Row
ConfirmTable.Col = Col

export default ConfirmTable
