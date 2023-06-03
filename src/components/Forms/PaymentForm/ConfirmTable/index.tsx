import classNames from 'classnames'

import styles from './styles.module.css'

interface RowProps {
  type?: 'balance' | 'total' | 'insufficient' | 'breaker'
}

interface ColProps {
  type?: 'insufficient'
}

const Row: React.FC<React.PropsWithChildren<RowProps>> = ({
  type,
  children,
}) => {
  const rowClasses = classNames({
    row: true,
    [`${type}`]: !!type,
  })

  return <section className={rowClasses}>{children}</section>
}

const Col: React.FC<React.PropsWithChildren<ColProps>> = ({
  type,
  children,
}) => {
  const colClasses = classNames({
    col: true,
    [`${type}`]: !!type,
  })

  return <section className={colClasses}>{children}</section>
}

const ConfirmTable: React.FC<{ children?: React.ReactNode }> & {
  Row: typeof Row
  Col: typeof Col
} = ({ children }) => <section className="confirm-table">{children}</section>

ConfirmTable.Row = Row
ConfirmTable.Col = Col

export default ConfirmTable
