import { Empty, Icon, Translate } from '~/components'

const EmptyResponse = ({
  description,
  articleOnlyMode
}: {
  description?: React.ReactNode
  articleOnlyMode?: boolean
}) => {
  return (
    <Empty
      icon={<Icon.Comment color="grey-lighter" size="xxl" />}
      description={
        description ||
        (articleOnlyMode ? (
          <Translate zh_hant="還沒有衍生作品" zh_hans="还没有衍生作品" />
        ) : (
          <Translate zh_hant="還沒有評論" zh_hans="还没有评论" />
        ))
      }
    />
  )
}

export default EmptyResponse
