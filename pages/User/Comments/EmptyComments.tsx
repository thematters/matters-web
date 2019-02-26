import { Empty, Icon } from '~/components'

import ICON_EMPTY_COMMENT from '~/static/icons/empty-comment.svg?sprite'

const EmptyComments = () => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_COMMENT.id}
        viewBox={ICON_EMPTY_COMMENT.viewBox}
        size={'xxlarge'}
      />
    }
  />
)

export default EmptyComments
