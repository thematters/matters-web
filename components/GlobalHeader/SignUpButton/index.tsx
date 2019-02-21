import { Button, Translate } from '~/components'

import { PATHS } from '~/common/enums'

export default () => (
  <Button
    is="link"
    size="large"
    bgColor="green"
    href={PATHS.AUTH_SIGNUP.href}
    as={PATHS.AUTH_SIGNUP.as}
    style={{ width: 80 }}
  >
    <Translate zh_hant="註冊" zh_hans="注册" />
  </Button>
)
