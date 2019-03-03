import { Empty } from '~/components/Empty'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import ICON_EMPTY_COMMENT from '~/static/icons/empty-comment.svg?sprite'

const EmptyComment = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_COMMENT.id}
        viewBox={ICON_EMPTY_COMMENT.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || <Translate zh_hant="還沒有評論" zh_hans="还没有评论" />
    }
  />
)

export default EmptyComment
