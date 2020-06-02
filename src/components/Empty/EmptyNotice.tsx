import { Empty, IconNavNotification, Translate } from '~/components'

export const EmptyNotice = () => (
  <Empty
    icon={<IconNavNotification size="xxl" />}
    description={<Translate zh_hant="還沒有通知" zh_hans="还没有通知" />}
  />
)
