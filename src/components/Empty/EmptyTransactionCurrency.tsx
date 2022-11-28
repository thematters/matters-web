import { Empty, IconPrice12, Translate } from '~/components'

export const EmptyTransactionCurrency = () => (
  <Empty
    icon={<IconPrice12 size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有此幣種記錄"
        zh_hans="还没有此币种记录"
        en="No this currency history."
      />
    }
  />
)
