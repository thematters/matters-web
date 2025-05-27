import IconComment from '@/public/static/icons/24px/comment.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyResponse = ({
  articleOnlyMode,
}: {
  articleOnlyMode?: boolean
}) => {
  return (
    <Empty
      icon={<Icon icon={IconComment} size={64} />}
      description={
        articleOnlyMode ? (
          <Translate
            zh_hant="還沒有衍生作品"
            zh_hans="还没有衍生作品"
            en="No related articles."
          />
        ) : (
          <Translate
            zh_hant="還沒有評論"
            zh_hans="还没有评论"
            en="No Responses."
          />
        )
      }
    />
  )
}
