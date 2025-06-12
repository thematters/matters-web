/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

type ListSpacing = 0 | 'base' | 'baseLoose' | 'loose' | 'xloose'

interface ListItemProps {
  [key: string]: any
}

interface ListProps {
  spacing?: [ListSpacing, ListSpacing]
  hasBorder?: boolean
  borderPosition?: 'top' | 'bottom'
  hasLastBorder?: boolean
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
  const listItemClasses = classNames({
    'list-item': true, // global selector
    [className]: !!className,
  })

  return (
    <section className={listItemClasses} role="listitem" {...restProps}>
      {children}
    </section>
  )
}

export const List: React.FC<ListProps> & {
  Item: typeof ListItem
} = ({
  spacing = [0, 0],
  hasBorder = true,
  borderPosition = 'bottom',
  hasLastBorder = true,

  children,

  className,
  ...restProps
}) => {
  const listClasses = classNames({
    [styles.list]: true,
    [styles[`spacingY${capitalizeFirstLetter(spacing[0] + '')}`]]: !!spacing[0],
    [styles[`spacingX${capitalizeFirstLetter(spacing[1] + '')}`]]: !!spacing[1],
    [styles.hasBorder]: !!hasBorder,
    [styles.borderPositionTop]: borderPosition === 'top',
    [styles.borderPositionBottom]: borderPosition === 'bottom',
    [styles.hasLastBorder]: !!hasLastBorder,
    [className]: !!className,
  })

  return (
    <section className={listClasses} role="list" {...restProps}>
      {children}
    </section>
  )
}

List.Item = ListItem
