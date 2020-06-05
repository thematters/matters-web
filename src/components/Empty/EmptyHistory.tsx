import { Empty, IconHistoryMedium, Translate } from '~/components'

export const EmptyHistory = () => (
  <Empty
    icon={<IconHistoryMedium size="xxl" />}
    description={
      <Translate zh_hant="還沒有瀏覽內容" zh_hans="还没有浏览内容" />
    }
  />
)
