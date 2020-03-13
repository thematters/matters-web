import { Empty, Icon, Translate } from '~/components'

export const EmptyTag = () => (
  <Empty
    icon={<Icon.HashTag size="xxl" />}
    description={<Translate id="TAG_NOT_FOUND" />}
  />
)
