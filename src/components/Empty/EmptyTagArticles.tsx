import { Empty, IconEmptyWarning, Translate } from '~/components'

export const EmptyTagArticles = () => (
  <Empty
    icon={<IconEmptyWarning size="xxl" />}
    description={<Translate zh_hant="還沒有作品" zh_hans="還沒有作品" />}
  />
)
