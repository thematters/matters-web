import { Empty, IconEmptyWarning72 } from '~/components'

export const EmptyWarning = ({
  description,
}: {
  description: React.ReactNode
}) => (
  <Empty icon={<IconEmptyWarning72 size="xxl" />} description={description} />
)
