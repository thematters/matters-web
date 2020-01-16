import { Empty, Icon, Translate } from '~/components'

const EmptyTag = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={<Icon.HashTag size="xl" />}
    description={
      description || <Translate zh_hant="標籤不存在" zh_hans="标签不存在" />
    }
  />
)

export default EmptyTag
