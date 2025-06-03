import IconWarn from '@/public/static/icons/24px/warn.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyAnalytics = () => (
  <Empty
    icon={<Icon icon={IconWarn} size={64} />}
    description={
      <Translate zh_hant="還沒有數據" zh_hans="还没有数据" en="No Analytics." />
    }
  />
)
