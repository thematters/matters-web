import IconWarn from '@/public/static/icons/24px/warn.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyFolloweeDonatedArticles = () => (
  <Empty
    icon={<Icon icon={IconWarn} size={64} />}
    description={
      <Translate
        zh_hant="還沒有支持的作品"
        zh_hans="还没有支持的作品"
        en="No donations"
      />
    }
  />
)
