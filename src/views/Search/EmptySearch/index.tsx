import { Empty, IconNavSearch } from '~/components'

const EmptySearch = ({
  description,
}: {
  description?: string | React.ReactNode
}) => <Empty icon={<IconNavSearch size="xxl" />} description={description} />

export default EmptySearch
