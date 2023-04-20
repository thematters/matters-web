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
  const listClasses = classNames({
    grey: forceGreyStyle,
    [`spacing-x-${spacingX}`]: !!spacingX,
    [`spacing-y-${spacingY}`]: !!spacingY,
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
