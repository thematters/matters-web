import { Empty, IconNavSearch, Translate } from '~/components'

export const EmptySearch = ({
  description,
}: {
  description?: string | React.ReactNode
}) => (
  <Empty
    icon={<IconNavSearch size="xxl" />}
    description={description || <Translate id="emptySearchResults" />}
  />
)
