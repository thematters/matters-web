import { ReactComponent as IconNavSearch } from '@/public/static/icons/24px/nav-search.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptySearch = ({
  description,
}: {
  description?: string | React.ReactNode
}) => (
  <Empty
    icon={<Icon icon={IconNavSearch} size={64} />}
    description={description || <Translate id="emptySearchResults" />}
  />
)
