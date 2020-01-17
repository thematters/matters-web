import { Empty, Icon } from '~/components'

const EmptyWarning = ({ description }: { description: React.ReactNode }) => (
  <Empty icon={<Icon.EmptyWarning size="xxl" />} description={description} />
)

export default EmptyWarning
