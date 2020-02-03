import { Icon, TextIcon, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

export default () => {
  return (
    <ModalSwitch modalId="editTagModal">
      {(open: any) => (
        <button type="button" onClick={e => open()} className="edit-tag">
          <TextIcon
            icon={<Icon.Edit color="green" size="xs" />}
            size="sm"
            spacing="xxxtight"
            color="green"
          >
            <Translate
              zh_hant={TEXT.zh_hant.editTag}
              zh_hans={TEXT.zh_hans.editTag}
            />
          </TextIcon>
          <style jsx>{styles}</style>
        </button>
      )}
    </ModalSwitch>
  )
}
