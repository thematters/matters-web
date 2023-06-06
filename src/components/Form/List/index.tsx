import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import Item from './Item'
import styles from './styles.module.css'

/**
 * iOS-like UI component
 *
 * https://developer.apple.com/design/human-interface-guidelines/ios/views/tables/
 *
 */

interface ListProps {
  groupName?: string | React.ReactNode
  spacingY?: 0 | 'xloose'
  spacingX?: 0 | 'base'
  forceGreyStyle?: boolean
}

const List: React.FC<React.PropsWithChildren<ListProps>> & {
  Item: typeof Item
} = ({
  groupName,
  spacingY = 0,
  spacingX = 'base',
  forceGreyStyle,
  children,
}) => {
  const groupClasses = classNames({
    [styles.group]: true,
    [spacingX ? styles[`spacingX${capitalizeFirstLetter(spacingX)}`] : '']:
      !!spacingX,
  })

  const listClasses = classNames({
    [styles.grey]: forceGreyStyle,
    [spacingY ? styles[`spacingY${capitalizeFirstLetter(spacingY)}`] : '']:
      !!spacingY,
  })

  return (
    <section className={groupClasses}>
      {groupName && <h4 className={styles.name}>{groupName}</h4>}

      <ul className={listClasses} role="list">
        {children}
      </ul>
    </section>
  )
}

List.Item = Item

export default List
