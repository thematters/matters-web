import { Empty, Icon, Translate } from '~/components'

export const EmptyBookmark = () => (
  <Empty
    icon={<Icon.BookmarkMedium size="xxl" />}
    description={
      <>
        <Translate zh_hant="看到好作品" zh_hans="看到好作品" />
        <br />
        <Translate zh_hant="可以點右下角收藏哦" zh_hans="可以点右下角收藏哦" />
      </>
    }
  />
)
