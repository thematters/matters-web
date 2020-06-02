import { Empty, IconHashTag, Translate } from '~/components'

export const EmptyTag = () => (
  <Empty
    icon={<IconHashTag size="xxl" />}
    description={<Translate id="TAG_NOT_FOUND" />}
  />
)
