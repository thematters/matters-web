import { toPath } from '~/common/utils'
import { IconIPFS24, Menu } from '~/components'
import { DropdownActionsArticleFragment } from '~/gql/graphql'

type IPFSButtonProps = {
  article: DropdownActionsArticleFragment
}

const IPFSButton: React.FC<IPFSButtonProps> = ({ article }) => {
  return (
    <Menu.Item
      text="IPFS"
      icon={<IconIPFS24 size="mdS" />}
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
