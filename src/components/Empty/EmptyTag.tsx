import { Empty, IconHashTag16, Translate } from '~/components'

export const EmptyTag = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<IconHashTag16 size="xxl" />}
    description={description || <Translate id="TAG_NOT_FOUND" />}
  />
)
