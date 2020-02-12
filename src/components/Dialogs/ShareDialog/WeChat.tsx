import { TextIcon, Translate, withIcon } from '~/components'

import { ReactComponent as IconShareWeChat } from '~/static/icons/share-wechat.svg'

const WeChat = () => (
  <button type="button" disabled>
    <TextIcon icon={withIcon(IconShareWeChat)({})} spacing="tight">
      <Translate zh_hant="WeChat" zh_hans="微信" />
    </TextIcon>
  </button>
)

export default WeChat
