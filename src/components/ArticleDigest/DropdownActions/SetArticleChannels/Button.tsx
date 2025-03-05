import { ReactComponent as IconSortUlAlt } from '@/public/static/icons/24px/sort-ul-alt.svg'
import { Icon, Menu } from '~/components'

type SetArticleChannelsButtonProps = {
  openDialog: () => void
}

const SetArticleChannelsButton = ({
  openDialog,
}: SetArticleChannelsButtonProps) => (
  <Menu.Item
    text="修正分類"
    icon={<Icon icon={IconSortUlAlt} size={24} />}
    onClick={openDialog}
  />
)

export default SetArticleChannelsButton
