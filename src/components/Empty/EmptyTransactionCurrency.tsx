import IconEmptyPrice from '@/public/static/icons/empty-price.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyTransactionCurrency = () => (
  <Empty
    icon={<Icon icon={IconEmptyPrice} size={64} />}
    description={
      <Translate
        zh_hant="還沒有此幣種紀錄"
        zh_hans="还没有此币种记录"
        en="No this currency history."
      />
    }
  />
)
