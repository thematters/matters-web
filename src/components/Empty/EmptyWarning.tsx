import { Empty, IconEmptyWarning } from '~/components'

export const EmptyWarning = ({
  description,
}: {
  description: React.ReactNode
}) => <Empty icon={<IconEmptyWarning size="xxl" />} description={description} />
