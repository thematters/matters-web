import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_RESPONSE from '~/static/icons/empty-comment.svg?sprite'

const EmptyResponse = ({
  description,
  articleOnlyMode
}: {
  description?: React.ReactNode
  articleOnlyMode?: boolean
}) => {
  return (
    <Empty
      icon={
        <Icon
          id={ICON_EMPTY_RESPONSE.id}
          viewBox={ICON_EMPTY_RESPONSE.viewBox}
          size={'xxlarge'}
        />
      }
      description={
        description || (
          articleOnlyMode
            ? <Translate zh_hant="還沒有衍生作品" zh_hans="还没有衍生作品" />
            : <Translate zh_hant="還沒有評論" zh_hans="还没有评论" />
        )
      }
    />
  )
}

export default EmptyResponse
