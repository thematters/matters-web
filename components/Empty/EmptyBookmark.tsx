import { Empty } from '~/components/Empty'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import ICON_EMPTY_BOOKMARK from '~/static/icons/empty-bookmark.svg?sprite'

const EmptyBookmark = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_BOOKMARK.id}
        viewBox={ICON_EMPTY_BOOKMARK.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || (
        <>
          <Translate zh_hant="看到好文章" zh_hans="看到好文章" />
          <br />
          <Translate
            zh_hant="可以點右下角收藏哦"
            zh_hans="可以点右下角收藏哦"
          />
        </>
      )
    }
  />
)

export default EmptyBookmark
