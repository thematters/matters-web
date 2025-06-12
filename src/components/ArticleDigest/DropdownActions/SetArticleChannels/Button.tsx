import IconSortUlAlt from '@/public/static/icons/24px/sort-ul-alt.svg'
import { Icon, Menu } from '~/components'

type SetArticleChannelsButtonProps = {
  openDialog: () => void
}

const SetArticleChannelsButton = ({
  openDialog,
}: SetArticleChannelsButtonProps) => (
  <Menu.Item
    text="頻道管理"
    icon={<Icon icon={IconSortUlAlt} size={24} />}
    onClick={openDialog}
  />
)

export default SetArticleChannelsButton
