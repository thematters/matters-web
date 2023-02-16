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
  groupName?: string | React.ReactNode
  spacing?: 0 | 'xloose'
  forceGreyStyle?: boolean
}

const List: React.FC<React.PropsWithChildren<ListProps>> & {
  Item: typeof Item
} = ({ groupName, spacing = 0, forceGreyStyle, children }) => {
  const listClasses = classNames({
    grey: forceGreyStyle,
    [`spacing-${spacing}`]: !!spacing,
  })

  return (
    <section className="group">
      {groupName && <h4 className="name">{groupName}</h4>}

      <ul className={listClasses} role="list">
        {children}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

List.Item = Item

export default List
