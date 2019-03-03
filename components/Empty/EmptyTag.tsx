import { Empty } from '~/components/Empty'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import ICON_HASHTAG from '~/static/icons/hashtag.svg?sprite'

const EmptyTag = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={
      <Icon id={ICON_HASHTAG.id} viewBox={ICON_HASHTAG.viewBox} size="xlarge" />
    }
    description={
      description || <Translate zh_hant="標籤不存在" zh_hans="标签不存在" />
    }
  />
)

export default EmptyTag
