import { Empty, IconEmptyWarning72, Translate } from '~/components'

export const EmptyAnalytics = () => (
  <Empty
    icon={<IconEmptyWarning72 size="xxl" />}
    description={
      <Translate zh_hant="還沒有數據" zh_hans="还没有数据" en="No analytics." />
    }
  />
)
