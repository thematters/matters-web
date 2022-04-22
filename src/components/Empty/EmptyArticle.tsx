import { Empty, IconEmptyWarning72, Translate } from '~/components'

export const EmptyArticle = () => (
  <Empty
    icon={<IconEmptyWarning72 size="xxl" />}
    description={
      <Translate zh_hant="還沒有創作" zh_hans="还没有创作" en="No Articles" />
    }
  />
)
