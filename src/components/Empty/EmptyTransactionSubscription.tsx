import { Empty, IconCircle24, Translate } from '~/components'

export const EmptyTransactionSubscription = () => (
  <Empty
    icon={<IconCircle24 size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有訂閱記錄"
        zh_hans="还没有订阅记录"
        en="No subscription history."
      />
    }
  />
)
