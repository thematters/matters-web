import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_LIKE from '~/static/icons/empty-like.svg?sprite'

const EmptyAppreciation = ({
  description
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_LIKE.id}
        viewBox={ICON_EMPTY_LIKE.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || (
        <Translate zh_hant="還沒有讚賞紀錄" zh_hans="还没有赞赏纪录" />
      )
    }
  />
)
export default EmptyAppreciation
