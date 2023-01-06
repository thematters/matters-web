import { Empty, IconClap24, Translate } from '~/components'

export const EmptyAppreciation = () => (
  <Empty
    icon={<IconClap24 size="xxl" />}
    description={
      <Translate
        zh_hant="還沒有讚賞記錄"
        zh_hans="还没有赞赏记录"
        en="No Likes."
      />
    }
  />
)
