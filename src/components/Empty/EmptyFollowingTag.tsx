import IconWarn from '@/public/static/icons/24px/warn.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyFollowingTag = () => (
  <Empty
    icon={<Icon icon={IconWarn} size={64} />}
    description={
      <Translate
        zh_hant="還沒有追蹤標籤更新，再找找你想看的吧"
        zh_hans="还没有关注标签更新，再找找你想看的吧"
        en="No updates from followed tags"
      />
    }
  />
)
