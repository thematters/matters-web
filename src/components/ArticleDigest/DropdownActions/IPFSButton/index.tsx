import { ReactComponent as IconIPFS } from '@/public/static/icons/24px/ipfs.svg'
import { toPath } from '~/common/utils'
import { Icon, Menu } from '~/components'
import { DropdownActionsArticleFragment } from '~/gql/graphql'

type IPFSButtonProps = {
  article: DropdownActionsArticleFragment
}

const IPFSButton: React.FC<IPFSButtonProps> = ({ article }) => {
  return (
    <Menu.Item
      text="IPFS"
      icon={<Icon icon={IconIPFS} size={20} />}
      ariaHasPopup="dialog"
      href={
        toPath({
          page: 'articleHistory',
          article,
        }).href
      }
    />
  )
}

export default IPFSButton
