import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_READING_HISTORY from '~/static/icons/empty-reading-history.svg?sprite'

const EmptyHistory = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_READING_HISTORY.id}
        viewBox={ICON_EMPTY_READING_HISTORY.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || (
        <Translate zh_hant="還沒有瀏覽內容" zh_hans="还没有浏览内容" />
      )
    }
  />
)
export default EmptyHistory
