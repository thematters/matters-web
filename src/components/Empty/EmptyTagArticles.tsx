import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_WARNING from '~/static/icons/empty-warning.svg?sprite'

const EmptyTag = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_WARNING.id}
        viewBox={ICON_EMPTY_WARNING.viewBox}
        size="xlarge"
      />
    }
    description={
      description || <Translate zh_hant="還沒有作品" zh_hans="還沒有作品" />
    }
  />
)

export default EmptyTag
