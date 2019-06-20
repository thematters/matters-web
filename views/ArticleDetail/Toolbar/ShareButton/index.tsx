import { Icon } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { isMobile } from '~/common/utils'
import ICON_SHARE from '~/static/icons/share.svg?sprite'

const ShareButton = () => (
  <>
    <ModalSwitch modalId="shareModal">
      {(open: any) => (
        <button
          type="button"
          aria-label="分享"
          onClick={async () => {
            const navigator = window.navigator as any
            if (navigator.share && isMobile()) {
              try {
                await navigator.share({
                  title: window.document.title,
                  url: window.location.href
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
