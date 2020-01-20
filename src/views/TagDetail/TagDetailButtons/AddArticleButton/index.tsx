import { Icon, TextIcon, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'

export default () => {
  return (
    <ModalSwitch modalId="addArticleTagModal">
      {(open: any) => (
        <button type="button" onClick={e => open()}>
          <TextIcon
            icon={<Icon.Add color="green" size="xs" />}
            spacing="xxxtight"
            color="green"
          >
            <Translate
              zh_hant={TEXT.zh_hant.addArticleTag}
              zh_hans={TEXT.zh_hans.addArticleTag}
            />
          </TextIcon>
        </button>
      )}
    </ModalSwitch>
  )
}
