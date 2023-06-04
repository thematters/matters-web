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
    [styles.row]: true,
    [styles[`${type}`]]: !!type,
  })

  return <section className={rowClasses}>{children}</section>
}

const Col: React.FC<React.PropsWithChildren<ColProps>> = ({
  type,
  children,
}) => {
  const colClasses = classNames({
    [styles.col]: true,
    [styles[`${type}`]]: !!type,
  })

  return <section className={colClasses}>{children}</section>
}

const ConfirmTable: React.FC<{ children?: React.ReactNode }> & {
  Row: typeof Row
  Col: typeof Col
} = ({ children }) => (
  <section className={styles.confirmTable}>{children}</section>
)

ConfirmTable.Row = Row
ConfirmTable.Col = Col

export default ConfirmTable
