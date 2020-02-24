import classNames from 'classnames'

import Item from './Item'
import styles from './styles.css'

/**
 * iOS-like UI component
 *
 * https://developer.apple.com/design/human-interface-guidelines/ios/views/tables/
 *
 */

interface ListProps {
  spacing?: 0 | 'xloose'
}

const List: React.FC<ListProps> & { Item: typeof Item } = ({
  spacing = 0,
  children
}) => {
  const listClass = classNames({
    [`spacing-${spacing}`]: !!spacing
  })

  return (
    <ul className={listClass}>
      {children}
      <style jsx>{styles}</style>
    </ul>
  )
}

List.Item = Item

export default List
