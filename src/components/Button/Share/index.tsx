import { useState } from 'react'

import { Button, Icon, IconColor, IconSize } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, isMobile } from '~/common/utils'

import ShareModal from './ShareModal'

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
  const [show, setShow] = useState(false)

  const shareLink = process.browser
    ? path
      ? `${window.location.origin}/${path}`
      : window.location.href
    : ''
  const shareTitle = process.browser ? title || window.document.title : ''

  const openShareModal = async ({ open }: { open: () => any }) => {
    setShow(true)

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
  const onClose = () => {
    setShow(false)
  }

  return (
    <>
      <ModalSwitch modalId="shareModal">
        {(open: () => any) => (
          <Button
            spacing={['xtight', 'xtight']}
            bgHoverColor="grey-lighter"
            aria-label={`分享《${title}》`}
            onClick={() => {
              openShareModal({ open })

              analytics.trackEvent(ANALYTICS_EVENTS, {
                type: SHARE_TYPE.ROOT,
                url: shareLink
              })
            }}
          >
            <Icon.Share size={size} color={color} />
          </Button>
        )}
      </ModalSwitch>

      {show && (
        <ShareModal title={shareTitle} link={shareLink} onClose={onClose} />
      )}
    </>
  )
}

export default ShareButton
