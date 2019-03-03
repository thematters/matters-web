import { Empty } from '~/components/Empty'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import ICON_EMPTY_WARNING from '~/static/icons/empty-warning.svg?sprite'

const EmptyFollowee = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_WARNING.id}
        viewBox={ICON_EMPTY_WARNING.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || (
        <Translate zh_hant="還沒有追蹤任何人" zh_hans="还没有追踪任何人" />
      )
    }
  />
)

export default EmptyFollowee
