import { Icon, TextIcon, Translate } from '~/components'

const WeChat = () => (
  <button type="button" disabled>
    <TextIcon icon={<Icon.ShareWeChat />} spacing="tight">
      <Translate zh_hant="WeChat" zh_hans="微信" />
    </TextIcon>
  </button>
)

export default WeChat
