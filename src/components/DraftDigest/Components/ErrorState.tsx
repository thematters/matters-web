import { Icon, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

const ErrorState = () => {
  return (
    <TextIcon icon={<Icon.DeleteRedCircle />} size="sm" color="red" weight="md">
      <Translate
        zh_hant={TEXT.zh_hant.publishFailed}
        zh_hans={TEXT.zh_hans.publishFailed}
      />
    </TextIcon>
  )
}

export default ErrorState
