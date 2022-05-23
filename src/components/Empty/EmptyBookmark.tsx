import { Empty, IconBookmark24, Translate } from '~/components'

export const EmptyBookmark = () => (
  <Empty
    icon={<IconBookmark24 size="xxl" />}
    description={
      <>
        <Translate
          zh_hant="看到好作品"
          zh_hans="看到好作品"
          en="bookmark articles you like"
        />
        <br />
        <Translate
          zh_hant="可以點右下角收藏哦"
          zh_hans="可以点右下角收藏哦"
          en="by clicking the bottom right corner"
        />
      </>
    }
  />
)
