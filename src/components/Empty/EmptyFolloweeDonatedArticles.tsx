import { Empty, IconEmptyWarning72, Translate } from '~/components'

export const EmptyFolloweeDonatedArticles = () => (
  <Empty
    icon={<IconEmptyWarning72 size="xxl" />}
    description={
      <Translate zh_hant="還沒有支持的作品" zh_hans="还没有支持的作品" />
    }
  />
)
