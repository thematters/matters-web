import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_COMMENT from '~/static/icons/empty-comment.svg?sprite'

const EmptyComments = () => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_COMMENT.id}
        viewBox={ICON_EMPTY_COMMENT.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      <>
        <Translate zh_hant="有趣的話題那麼多" zh_hans="有趣的话题那么多" />
        <br />
        <Translate zh_hant="來加入討論吧" zh_hans="来加入讨论吧" />
      </>
    }
  />
)

export default EmptyComments
