import { Icon, TextIcon, Translate } from '~/components'

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
      <Translate zh_hant="發布失敗" zh_hans="发布失败" />
    </TextIcon>
  )
}

export default ErrorState
