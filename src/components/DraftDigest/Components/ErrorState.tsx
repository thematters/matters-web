import { Icon, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import ICON_DELETE_RED_CIRCLE from '~/static/icons/delete-red-circle.svg?sprite'

const ErrorState = () => {
  return (
    <TextIcon
      icon={
        <Icon
          id={ICON_DELETE_RED_CIRCLE.id}
          viewBox={ICON_DELETE_RED_CIRCLE.viewBox}
          size="small"
        />
      }
      size="sm"
      color="red"
      weight="medium"
    >
      <Translate
        zh_hant={TEXT.zh_hant.publishFailed}
        zh_hans={TEXT.zh_hans.publishFailed}
      />
    </TextIcon>
  )
}

export default ErrorState
