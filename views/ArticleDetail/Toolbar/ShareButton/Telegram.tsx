import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { objectToGetParams } from '~/common/utils'
import ICON_SHARE_TELEGRAM from '~/static/icons/share-telegram.svg?sprite'

const Telegram = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://telegram.me/share/' +
        objectToGetParams({
          url,
          text
        })
      return window.open(shareUrl, 'Share to Telegram')
    }}
  >
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_TELEGRAM.id}
          viewBox={ICON_SHARE_TELEGRAM.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="Telegram"
    />
  </button>
)

export default Telegram
