import { useQuery } from '@apollo/react-hooks'

import {
  Button,
  ButtonBgColor,
  ButtonHeight,
  ButtonSpacingX,
  ButtonSpacingY,
  ButtonWidth,
  Icon,
  IconColor,
  IconSize
} from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import { ANALYTICS_EVENTS, SHARE_TYPE, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import { ShareDialog } from './ShareDialog'

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo'

interface ShareButtonProps {
  title?: string
  path?: string

  bgColor?: ButtonBgColor
  hasIcon?: boolean
  iconSize?: Extract<IconSize, 'md-s'>
  iconColor?: Extract<IconColor, 'grey' | 'black'>
  size?: [ButtonWidth, ButtonHeight]
  spacing?: [ButtonSpacingY, ButtonSpacingX]
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  children,
  title,
  path,

  bgColor,
  hasIcon = true,
  iconSize,
  iconColor = 'black',
  size,
  spacing
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

  const isGreen = bgColor === 'green'
  const buttonBgHoverColor = isGreen ? undefined : 'grey-lighter'
  const buttonSpacing = spacing || ['xtight', 'xtight']

  return (
    <ShareDialog title={shareTitle} link={shareLink}>
      {({ open }) => (
        <Button
          size={size}
          spacing={buttonSpacing}
          bgColor={bgColor}
          bgHoverColor={buttonBgHoverColor}
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
          {hasIcon && <Icon.Share size={iconSize} color={iconColor} />}
          {children}
        </Button>
      )}
    </ShareDialog>
  )
}
