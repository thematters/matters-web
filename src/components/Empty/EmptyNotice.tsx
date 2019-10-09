import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_NOTIFICATION from '~/static/icons/empty-notification.svg?sprite'

const EmptyNotice = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_NOTIFICATION.id}
        viewBox={ICON_EMPTY_NOTIFICATION.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || <Translate zh_hant="還沒有通知" zh_hans="还没有通知" />
    }
  />
)

export default EmptyNotice
