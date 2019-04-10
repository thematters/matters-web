import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import { objectToGetParams } from '~/common/utils'
import ICON_SHARE_LINE from '~/static/icons/share-line.svg?sprite'

const LINE = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const shareUrl =
        'https://social-plugins.line.me/lineit/share' +
        objectToGetParams({
          url,
          text
        })
      return window.open(shareUrl, 'Share to Line')
    }}
  >
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_LINE.id}
          viewBox={ICON_SHARE_LINE.viewBox}
          size="small"
        />
      }
      spacing="tight"
      text="LINE"
    />
  </button>
)

export default LINE
