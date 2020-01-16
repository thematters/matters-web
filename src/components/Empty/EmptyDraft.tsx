import { Empty, Icon, Translate } from '~/components'

const EmptyDraft = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={<Icon.EmptyWarning size="xxl" />}
    description={
      description || <Translate zh_hant="還沒有創作" zh_hans="还没有创作" />
    }
  />
)

export default EmptyDraft
