import classNames from 'classnames'

import styles from './styles.css'

type ListItemSpacing = 0 | '0' | 'xtight' | 'tight' | 'base' | 'loose'

interface ListItemProps {
  spacing?: [ListItemSpacing, ListItemSpacing]
  noBorder?: boolean

  [key: string]: any
}

/**
 *
 * Usage:
 *
 * ```jsx
 *
 * <List>
 *  <List.Item>
 *    <ComponentA />
 *  </List.Ite>
 *
 *  <List.Item>
 *    <ComponentB />
 *  </List.Ite>
 * </List>
 * ```
 *
 */
const ListItem: React.FC<ListItemProps> = ({
  spacing = [0, 0],
  noBorder,

  children,

  className,
  ...restProps
}) => {
  const listItemClass = classNames({
    'list-item': true,
    [`spacing-vertical-${spacing[0]}`]: !!spacing[0],
    [`spacing-horizontal-${spacing[1]}`]: !!spacing[1],
    'no-border': !!noBorder,
    [className]: !!className
  })

  return (
    <section className={listItemClass} role="listitem" {...restProps}>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

export const List: React.FC & {
  Item: typeof ListItem
} = ({ children }) => {
  return <section role="list">{children}</section>
}

List.Item = ListItem
