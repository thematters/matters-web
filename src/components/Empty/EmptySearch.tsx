import { Empty, IconNavSearch32, Translate } from '~/components'

export const EmptySearch = ({
  description,
}: {
  description?: string | React.ReactNode
}) => (
  <Empty
    icon={<IconNavSearch32 size="xxl" />}
    description={description || <Translate id="emptySearchResults" />}
  />
)
