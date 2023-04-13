import { Empty, IconNavNotification32, Translate } from '~/components'

export const EmptyNotice = () => (
  <Empty
    icon={<IconNavNotification32 size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有通知"
        zh_hans="还没有通知"
        en="No Notifications."
      />
    }
  />
)
