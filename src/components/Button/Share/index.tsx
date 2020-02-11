import { useState } from 'react'

import { Button, Icon, IconColor, IconSize } from '~/components'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, isMobile } from '~/common/utils'

import ShareDialog from './ShareDialog'

interface ShareButtonProps {
  title?: string
  path?: string

  size?: Extract<IconSize, 'md-s'>
  color?: Extract<IconColor, 'grey' | 'black'>
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  path,

  size,
  color = 'black'
}) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const shareLink = process.browser
    ? path
      ? `${window.location.origin}/${path}`
      : window.location.href
    : ''
  const shareTitle = process.browser ? title || window.document.title : ''

  const openShareModal = async () => {
    open()

    const navigator = window.navigator as any
    if (navigator.share && isMobile()) {
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
  }

  return (
    <>
      <Button
        spacing={['xtight', 'xtight']}
        bgHoverColor="grey-lighter"
        aria-label={`分享《${title || ''}》`}
        onClick={() => {
          openShareModal()

          analytics.trackEvent(ANALYTICS_EVENTS, {
            type: SHARE_TYPE.ROOT,
            url: shareLink
          })
        }}
      >
        <Icon.Share size={size} color={color} />
      </Button>

      <ShareDialog
        title={shareTitle}
        link={shareLink}
        isOpen={showDialog}
        onDismiss={close}
      />
    </>
  )
}

export default ShareButton
