import { Button } from '~/components'

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
    註冊
  </Button>
)
