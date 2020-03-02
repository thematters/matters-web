import { useQuery } from '@apollo/react-hooks'

import { Button, Icon, IconColor, IconSize } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import { ANALYTICS_EVENTS, SHARE_TYPE, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import { ShareDialog } from './ShareDialog'

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo'

interface ShareButtonProps {
  title?: string
  path?: string

  size?: Extract<IconSize, 'md-s'>
  color?: Extract<IconColor, 'grey' | 'black'>
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  path,

  size,
  color = 'black'
}) => {
  const { data } = useQuery<ClientInfo>(CLIENT_INFO, {
    variables: { id: 'local' }
  })
  const isMobile = data?.clientInfo.isMobile

  const shareLink = process.browser
    ? path
      ? `${window.location.origin}${path}`
      : window.location.href
    : ''
  const shareTitle =
    title || (process.browser ? window.document.title || '' : '')

  return (
    <ShareDialog title={shareTitle} link={shareLink}>
      {({ open }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgHoverColor="grey-lighter"
          aria-label={TEXT.zh_hant.share}
          aria-haspopup="true"
          onClick={async () => {
            const navigator = window.navigator as any

            if (navigator.share && isMobile) {
              try {
                await navigator.share({
                  title: shareTitle,
                  url: shareLink
                })
              } catch (e) {
                console.error(e)
              }
            } else {
              open()
            }

            analytics.trackEvent(ANALYTICS_EVENTS, {
              type: SHARE_TYPE.ROOT,
              url: shareLink
            })
          }}
        >
          <Icon.Share size={size} color={color} />
        </Button>
      )}
    </ShareDialog>
  )
}
