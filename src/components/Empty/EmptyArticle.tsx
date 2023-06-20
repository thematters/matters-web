import { Empty, IconFile88, Translate } from '~/components'

export const EmptyArticle = () => (
  <Empty
    spacingY="xxloose"
    icon={<IconFile88 size="xxxlM" />}
    description={<Translate id="noArticlesYet" />}
  />
)
