import { Button } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

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
        登入
      </Button>
    )}
  </ModalSwitch>
)
