import { Empty, Icon, Translate } from '~/components'

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
    description={<Translate zh_hant="還沒有評論" zh_hans="还没有评论" />}
  />
)

export default EmptyComments
