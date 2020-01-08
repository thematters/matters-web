import { Empty, Icon, Translate } from '~/components'

const EmptyTag = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={<Icon.EmptyWarning size="xxl" />}
    description={
      description || <Translate zh_hant="還沒有作品" zh_hans="還沒有作品" />
    }
  />
)

export default EmptyTag
