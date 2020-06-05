import { Empty, IconLikeMedium, Translate } from '~/components'

export const EmptyAppreciation = () => (
  <Empty
    icon={<IconLikeMedium size="xxl" />}
    description={
      <Translate zh_hant="還沒有讚賞記錄" zh_hans="还没有赞赏记录" />
    }
  />
)
