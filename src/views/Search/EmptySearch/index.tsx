import { Empty, Icon, SearchBar } from '~/components'

import ICON_SEARCH from '~/static/icons/search.svg?sprite'

const EmptySearch = ({
  inSidebar = false,
  description
}: {
  inSidebar?: boolean
  description?: string | React.ReactNode
}) => (
  <>
    <Empty
      icon={
        !inSidebar && (
          <Icon
            id={ICON_SEARCH.id}
            viewBox={ICON_SEARCH.viewBox}
            size={'xxlarge'}
          />
        )
      }
      description={description}
      size={inSidebar ? 'small' : 'default'}
      spacing={['default', '0']}
    >
      {!inSidebar && <SearchBar autoComplete={false} />}
    </Empty>
  </>
)

export default EmptySearch
