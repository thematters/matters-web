import IconIPFS from '@/public/static/icons/24px/ipfs.svg'
import type { ClickButtonProp as TrackEventProps } from '~/common/utils'
import { analytics, toPath } from '~/common/utils'
import { Icon, Menu, useRoute } from '~/components'
import { DropdownActionsArticleFragment } from '~/gql/graphql'

type IPFSButtonProps = {
  article: DropdownActionsArticleFragment
} & Omit<TrackEventProps, 'type'>

const IPFSButton: React.FC<IPFSButtonProps> = ({
  article,
  pageType,
  pageComponent,
}) => {
  const { router } = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { shortHash, v, ...qs } = router.query

  return (
    <Menu.Item
      text="IPFS"
      icon={<Icon icon={IconIPFS} size={20} />}
      ariaHasPopup="dialog"
      href={
        toPath({
          page: 'articleHistory',
          article,
          search: qs as { [key: string]: string }, // forward qs to history page
        }).href
      }
      onClick={() => {
        if (pageType || pageComponent) {
          analytics.trackEvent('click_button', {
            type: 'ipfs',
            pageType,
            pageComponent,
          })
        }
      }}
    />
  )
}

export default IPFSButton
