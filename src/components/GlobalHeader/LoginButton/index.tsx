import { Button, TextIcon } from '~/components'
import { Translate } from '~/components/Language'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'

export default () => (
  <ModalSwitch modalId="loginModal">
    {(open: any) => (
      <Button
        size={[null, '2.25rem']}
        spacing={[0, 'loose']}
        bgHoverColor="green-lighter"
        onClick={() => open()}
      >
        <TextIcon color="green" weight="md">
          <Translate
            zh_hant={TEXT.zh_hant.login}
            zh_hans={TEXT.zh_hans.login}
          />
        </TextIcon>
      </Button>
    )}
  </ModalSwitch>
)
