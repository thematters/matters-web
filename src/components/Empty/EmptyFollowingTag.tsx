import { Empty, IconEmptyWarning72, Translate } from '~/components'

export const EmptyFollowingTag = () => (
  <Empty
    icon={<IconEmptyWarning72 size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有追蹤標籤更新，再找找你想看的吧"
        zh_hans="还没有追踪标签更新，再找找你想看的吧"
      />
    }
  />
)
