import { Button, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

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
        <Translate zh_hant="註冊" zh_hans="注册" />
      </Button>
    )}
  </ModalSwitch>
)
