import classNames from 'classnames'

import styles from './styles.module.css'

type GridItemProps = {
  children: React.ReactNode
}

type GridProps = {
  children: React.ReactNode
  className?: string
}

const GridItem = ({ children }: GridItemProps) => {
  return <section>{children}</section>
}

export const Grid = ({ children, className }: GridProps) => {
  const gridClasses = classNames({
    [styles.grid]: true,
    [`${className}`]: !!className,
  })
  return <section className={gridClasses}>{children}</section>
}

Grid.Item = GridItem
