import { ReactComponent as IconDonate } from '@/public/static/icons/24px/donate.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyTransactionSupport = () => (
  <Empty
    icon={<Icon icon={IconDonate} size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有支持記錄"
        zh_hans="还没有支持记录"
        en="No support history."
      />
    }
  />
)
