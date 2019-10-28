import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import ICON_SHARE_WECHAT from '~/static/icons/share-wechat.svg?sprite'

const WeChat = () => (
  <button type="button" disabled>
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_WECHAT.id}
          viewBox={ICON_SHARE_WECHAT.viewBox}
          size="small"
        />
      }
      spacing="tight"
    >
      <Translate zh_hant="WeChat" zh_hans="微信" />
    </TextIcon>
  </button>
)

export default WeChat
