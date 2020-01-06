import { Icon, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

const ErrorState = () => {
  return (
    <TextIcon
      icon={<Icon.DeleteRedCircle size="sm" />}
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
