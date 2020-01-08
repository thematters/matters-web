import { Empty, Icon, SearchBar } from '~/components'

const EmptySearch = ({
  inSidebar = false,
  description
}: {
  inSidebar?: boolean
  description?: string | React.ReactNode
}) => (
  <>
    <Empty
      icon={!inSidebar && <Icon.Search size="xxl" />}
      description={description}
      size={inSidebar ? 'sm' : 'default'}
      spacing={['default', '0']}
    >
      {!inSidebar && <SearchBar autoComplete={false} />}
    </Empty>
  </>
)

export default EmptySearch
