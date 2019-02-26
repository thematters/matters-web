import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_BOOKMARK from '~/static/icons/empty-bookmark.svg?sprite'

const EmptyBookmarks = () => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_BOOKMARK.id}
        viewBox={ICON_EMPTY_BOOKMARK.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      <>
        <Translate zh_hant="看到好文章" zh_hans="看到好文章" />
        <br />
        <Translate zh_hant="可以點右下角收藏哦" zh_hans="可以点右下角收藏哦" />
      </>
    }
  />
)

export default EmptyBookmarks
