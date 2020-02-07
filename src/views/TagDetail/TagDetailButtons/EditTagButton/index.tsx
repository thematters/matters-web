import { Button, Icon, TextIcon, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'

export default () => {
  return (
    <ModalSwitch modalId="editTagModal">
      {(open: any) => (
        <Button
          size={[null, '1.5rem']}
          spacing={[0, 'xtight']}
          bgHoverColor="green-lighter"
          onClick={open}
        >
          <TextIcon
            icon={<Icon.Edit color="green" size="xs" />}
            size="sm"
            color="green"
          >
            <Translate
              zh_hant={TEXT.zh_hant.editTag}
              zh_hans={TEXT.zh_hans.editTag}
            />
          </TextIcon>
        </Button>
      )}
    </ModalSwitch>
  )
}
