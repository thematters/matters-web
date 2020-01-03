import { Icon } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics, isMobile } from '~/common/utils'
import ICON_SHARE from '~/static/icons/share.svg?sprite'

const ShareButton = () => (
  <>
    <ModalSwitch modalId="shareModal">
      {(open: any) => (
        <button
          type="button"
          aria-label="分享"
          onClick={async () => {
            const url = window.location.href
            analytics.trackEvent(ANALYTICS_EVENTS, {
              type: SHARE_TYPE.ROOT,
              url
            })
            const navigator = window.navigator as any
            if (navigator.share && isMobile()) {
              try {
                await navigator.share({
                  title: window.document.title,
                  url
                })
              } catch (e) {
                console.error(e)
              }
            } else {
              open()
            }
          }}
        >
          <Icon
            size="default"
            id={ICON_SHARE.id}
            viewBox={ICON_SHARE.viewBox}
          />
        </button>
      )}
    </ModalSwitch>
  </>
)

export default ShareButton
