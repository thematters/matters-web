import { Button } from '~/components'
import { Translate } from '~/components/Language'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'

export default () => (
  <ModalSwitch modalId="loginModal">
    {(open: any) => (
      <Button
        is="button"
        size="large"
        bgColor="transparent"
        spacing="default"
        className="u-link-green"
        onClick={() => open()}
      >
        <Translate zh_hant={TEXT.zh_hant.login} zh_hans={TEXT.zh_hans.login} />
      </Button>
    )}
  </ModalSwitch>
)
