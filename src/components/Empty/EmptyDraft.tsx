import { Empty, IconDraft24, Translate } from '~/components'

export const EmptyDraft = () => (
  <Empty
    icon={<IconDraft24 size="xxl" />}
    description={<Translate zh_hant="還沒有草稿" zh_hans="还没有草稿" />}
  />
)
