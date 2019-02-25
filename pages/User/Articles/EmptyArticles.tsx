import { Empty, Icon } from '~/components'

import ICON_EMPTY_WARNING from '~/static/icons/empty-warning.svg?sprite'

const EmptyArticles = () => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_WARNING.id}
        viewBox={ICON_EMPTY_WARNING.viewBox}
        size={'xxlarge'}
      />
    }
  />
)

export default EmptyArticles
