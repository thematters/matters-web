import { Empty, IconActionComment16, Translate } from '~/components'

export const EmptyComment = () => (
  <Empty
    icon={<IconActionComment16 size="xxl" />}
    description={<Translate zh_hant="還沒有評論" zh_hans="还没有评论" />}
  />
)
