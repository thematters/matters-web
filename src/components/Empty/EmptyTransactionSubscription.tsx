import { Empty, IconWallet24, Translate } from '~/components'

export const EmptyTransactionSubscription = () => (
  <Empty
    icon={<IconWallet24 size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有訂閱記錄"
        zh_hans="还没有订阅记录"
        en="No subscription history."
      />
    }
  />
)
