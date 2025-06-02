import IconDonate from '@/public/static/icons/24px/donate.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyTransactionSupport = () => (
  <Empty
    icon={<Icon icon={IconDonate} size={64} />}
    description={
      <Translate
        zh_hant="還沒有支持紀錄"
        zh_hans="还没有支持记录"
        en="No support history."
      />
    }
  />
)
