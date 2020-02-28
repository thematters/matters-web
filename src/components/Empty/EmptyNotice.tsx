import { Empty, Icon, Translate } from '~/components'

export const EmptyNotice = ({
  description
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<Icon.NotificationLarge color="grey-lighter" size="xxl" />}
    description={
      description || <Translate zh_hant="還沒有通知" zh_hans="还没有通知" />
    }
  />
)
