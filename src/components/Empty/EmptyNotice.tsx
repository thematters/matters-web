import IconNavNotifications from '@/public/static/icons/24px/nav-notifications.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyNotice = () => (
  <Empty
    icon={<Icon icon={IconNavNotifications} size={64} />}
    description={
      <Translate
        zh_hant="還沒有通知"
        zh_hans="还没有通知"
        en="No Notifications."
      />
    }
  />
)
