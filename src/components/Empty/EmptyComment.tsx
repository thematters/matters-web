import { Empty, IconComment, Translate } from '~/components'

export const EmptyComment = () => (
  <Empty
    icon={<IconComment size="xxl" />}
    description={<Translate zh_hant="還沒有評論" zh_hans="还没有评论" />}
  />
)
