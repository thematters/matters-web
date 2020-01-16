import { Empty, Icon, Translate } from '~/components'

const EmptyNotice = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={<Icon.EmptyNotification size="xxl" />}
    description={
      description || <Translate zh_hant="還沒有通知" zh_hans="还没有通知" />
    }
  />
)

export default EmptyNotice
