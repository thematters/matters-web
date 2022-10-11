import { Empty, IconEmptyWarning72, Translate } from '~/components'

export const EmptyArticle = () => (
  <Empty
    icon={<IconEmptyWarning72 size="xxl" />}
    description={<Translate id="noArticlesYet" />}
  />
)
