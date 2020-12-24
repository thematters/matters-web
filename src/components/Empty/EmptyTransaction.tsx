import { Empty, IconWallet24, Translate } from '~/components'

export const EmptyTransaction = () => (
  <Empty
    icon={<IconWallet24 size="xxl" />}
    description={
      <Translate zh_hant="還沒有交易記錄" zh_hans="还没有交易记录" />
    }
  />
)
