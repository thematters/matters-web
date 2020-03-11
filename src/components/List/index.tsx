import classNames from 'classnames'

import styles from './styles.css'

type ListSpacing = 0 | 'base' | 'loose' | 'xloose'

interface ListItemProps {
  [key: string]: any
}

interface ListProps {
  spacing?: [ListSpacing, ListSpacing]
  hasBorder?: boolean
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
  children,

  className,
  ...restProps
}) => {
  const listItemClass = classNames({
    'list-item': true,
    [className]: !!className
  })

  return (
    <section className={listItemClass} role="listitem" {...restProps}>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

export const List: React.FC<ListProps> & {
  Item: typeof ListItem
} = ({
  spacing = [0, 0],
  hasBorder,

  children,

  className,
  ...restProps
}) => {
  const listClass = classNames({
    list: true,
    [`spacing-y-${spacing[0]}`]: !!spacing[0],
    [`spacing-x-${spacing[1]}`]: !!spacing[1],
    'has-border': !!hasBorder,
    [className]: !!className
  })

  return (
    <section className={listClass} role="list" {...restProps}>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

List.Item = ListItem
