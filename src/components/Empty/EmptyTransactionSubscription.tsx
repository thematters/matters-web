import IconCircle from '@/public/static/icons/24px/circle.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyTransactionSubscription = () => (
  <Empty
    icon={<Icon icon={IconCircle} size={64} />}
    description={
      <Translate
        zh_hant="還沒有訂閱紀錄"
        zh_hans="还没有订阅记录"
        en="No subscription history."
      />
    }
  />
)
