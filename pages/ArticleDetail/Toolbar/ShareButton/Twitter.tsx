import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { objectToGetParams } from '~/common/utils'
import ICON_SHARE_TWITTER from '~/static/icons/share-twitter.svg?sprite'

const Twitter = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://twitter.com/share' +
        objectToGetParams({
          url,
          text,
          via: 'matterslab'
        })
      return window.open(shareUrl, 'Share to Twitter')
    }}
  >
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_TWITTER.id}
          viewBox={ICON_SHARE_TWITTER.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="Twitter"
    />
  </button>
)

export default Twitter
