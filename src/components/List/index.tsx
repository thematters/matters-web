import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import { ResponsiveWrapper } from '../Interaction'
import styles from './styles.module.css'

type ListSpacing = 0 | 'base' | 'loose' | 'xloose'

interface ListItemProps {
  [key: string]: any
}

interface ListProps {
  responsiveWrapper?: boolean
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
  responsiveWrapper,

  children,

  className,
  ...restProps
}) => {
  const listClasses = classNames({
    [styles.list]: true,
    [styles[`spacingY${capitalizeFirstLetter(spacing[0] + '')}`]]: !!spacing[0],
    [styles[`spacingX${capitalizeFirstLetter(spacing[1] + '')}`]]: !!spacing[1],
    [styles.hasBorder]: !!hasBorder,
    [className]: !!className,
  })

  if (responsiveWrapper) {
    return (
      <ResponsiveWrapper>
        <section className={listClasses} role="list" {...restProps}>
          {children}
        </section>
      </ResponsiveWrapper>
    )
  }

  return (
    <section className={listClasses} role="list" {...restProps}>
      {children}
    </section>
  )
}

List.Item = ListItem
