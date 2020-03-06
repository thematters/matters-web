import { Empty, Icon } from '~/components'

const EmptySearch = ({
  inSidebar = false,
  description
}: {
  inSidebar?: boolean
  description?: string | React.ReactNode
}) => (
  <>
    <Empty
      icon={!inSidebar && <Icon.Search size="xxl" color="grey-lighter" />}
      description={description}
      size={inSidebar ? 'sm' : undefined}
      spacing={['loose', '0']}
    />
  </>
)

export default EmptySearch
