import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_WARNING from '~/static/icons/empty-warning.svg?sprite'

const EmptyFollowers = () => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_WARNING.id}
        viewBox={ICON_EMPTY_WARNING.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      <Translate zh_hant="暫無追蹤的作者" zh_hans="暂无追踪的作者" />
    }
  />
)

export default EmptyFollowers
