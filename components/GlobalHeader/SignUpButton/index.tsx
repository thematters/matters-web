import { Button, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'

export default () => (
  <ModalSwitch modalId="signUpModal">
    {(open: any) => (
      <Button
        is="button"
        size="large"
        bgColor="green"
        style={{ minWidth: '5rem' }}
        onClick={() => open()}
      >
        <Translate
          zh_hant={TEXT.zh_hant.register}
          zh_hans={TEXT.zh_hans.register}
        />
      </Button>
    )}
  </ModalSwitch>
)
