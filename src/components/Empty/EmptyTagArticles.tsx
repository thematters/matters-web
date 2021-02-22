import { Empty, IconEmptyWarning72, Translate } from '~/components'

export const EmptyTagArticles = () => (
  <Empty
    icon={<IconEmptyWarning72 size="xxl" />}
    description={
      <Translate zh_hant="還沒有作品" zh_hans="還沒有作品" en="No articles." />
    }
  />
)
