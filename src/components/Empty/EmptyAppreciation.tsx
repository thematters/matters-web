import { Empty, Icon, Translate } from '~/components'

const EmptyAppreciation = ({
  description
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<Icon.EmptyLike size="xxl" />}
    description={
      description || (
        <Translate zh_hant="還沒有讚賞紀錄" zh_hans="还没有赞赏纪录" />
      )
    }
  />
)
export default EmptyAppreciation
