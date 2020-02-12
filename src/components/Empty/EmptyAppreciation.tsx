import { Empty, Icon, Translate } from '~/components'

export const EmptyAppreciation = ({
  description
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<Icon.Like color="grey-lighter" size="xxl" />}
    description={
      description || (
        <Translate zh_hant="還沒有讚賞紀錄" zh_hans="还没有赞赏纪录" />
      )
    }
  />
)
