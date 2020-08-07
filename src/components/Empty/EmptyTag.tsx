import { Empty, IconHashTag, Translate } from '~/components'

export const EmptyTag = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<IconHashTag size="xxl" />}
    description={description || <Translate id="TAG_NOT_FOUND" />}
  />
)
