import { Empty, IconDonate24, Translate } from '~/components'

export const EmptyTransactionSupport = () => (
  <Empty
    icon={<IconDonate24 size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有支持記錄"
        zh_hans="还没有支持记录"
        en="No support history."
      />
    }
  />
)
