import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_WARNING from '~/static/icons/empty-warning.svg?sprite'

const EmptyArticle = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_WARNING.id}
        viewBox={ICON_EMPTY_WARNING.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || <Translate zh_hant="還沒有創作" zh_hans="还没有创作" />
    }
  />
)

export default EmptyArticle
