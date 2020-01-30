import { useState } from 'react'

import { Icon, IconColor, IconSize } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, isMobile } from '~/common/utils'

import ShareModal from './ShareModal'

interface ShareButtonProps {
  title?: string
  path?: string

  size?: Extract<IconSize, 'md'>
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
          <button
            type="button"
            aria-label={`分享《${title}》`}
            onClick={e => {
              openShareModal({ open })

              analytics.trackEvent(ANALYTICS_EVENTS, {
                type: SHARE_TYPE.ROOT,
                url: shareLink
              })

              e.stopPropagation()
            }}
          >
            <Icon.Share size={size} color={color} />
          </button>
        )}
      </ModalSwitch>

      {show && (
        <ShareModal title={shareTitle} link={shareLink} onClose={onClose} />
      )}
    </>
  )
}

export default ShareButton
