import { Empty, Icon, Translate } from '~/components'

import ICON_EMPTY_MAT from '~/static/icons/empty-mat.svg?sprite'

const EmptyMAT = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_MAT.id}
        viewBox={ICON_EMPTY_MAT.viewBox}
        size={'xxlarge'}
      />
    }
    description={
      description || (
        <Translate zh_hant="還沒有交易紀錄" zh_hans="还没有交易纪录" />
      )
    }
  />
)
export default EmptyMAT
