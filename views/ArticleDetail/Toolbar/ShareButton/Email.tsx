import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import { dom, objectToGetParams } from '~/common/utils'
import ICON_SHARE_EMAIL from '~/static/icons/share-email.svg?sprite'

const Email = () => (
  <button
    type="button"
    onClick={() => {
      const url = window.location.href
      const text = window.document.title
      const description = dom
        .$('meta[name="description"]')
        .getAttribute('content')
      const shareUrl =
        'mailto:' +
        objectToGetParams({ subject: text, body: `${description}\n\n${url}` })
      return (window.location.href = shareUrl)
    }}
  >
    <TextIcon
      icon={
        <Icon
          id={ICON_SHARE_EMAIL.id}
          viewBox={ICON_SHARE_EMAIL.viewBox}
          size="small"
        />
      }
      spacing="tight"
    >
      <Translate zh_hant="郵件" zh_hans="邮件" />
    </TextIcon>
  </button>
)

export default Email
