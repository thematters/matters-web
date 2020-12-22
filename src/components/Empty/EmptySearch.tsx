import { Empty, IconNavSearch24, Translate } from '~/components'

export const EmptySearch = ({
  description,
}: {
  description?: string | React.ReactNode
}) => (
  <Empty
    icon={<IconNavSearch24 size="xxl" />}
    description={description || <Translate id="emptySearchResults" />}
  />
)
