import { Empty, Icon, Translate } from '~/components'

export const EmptyResponse = ({
  articleOnlyMode
}: {
  articleOnlyMode?: boolean
}) => {
  return (
    <Empty
      icon={<Icon.Comment size="xxl" />}
      description={
        articleOnlyMode ? (
          <Translate zh_hant="還沒有衍生作品" zh_hans="还没有衍生作品" />
        ) : (
          <Translate zh_hant="還沒有評論" zh_hans="还没有评论" />
        )
      }
    />
  )
}
