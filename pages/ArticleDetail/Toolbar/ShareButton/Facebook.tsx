import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { objectToGetParams } from '~/common/utils'
import ICON_SHARE_FACEBOOK from '~/static/icons/share-facebook.svg?sprite'

const Facebook = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const shareUrl =
        'https://www.facebook.com/sharer/sharer.php' +
        objectToGetParams({
          u: url
        })
      return window.open(shareUrl, 'Share to Facebook')
    }}
  >
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_FACEBOOK.id}
          viewBox={ICON_SHARE_FACEBOOK.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="Facebook"
    />
  </button>
)

export default Facebook
