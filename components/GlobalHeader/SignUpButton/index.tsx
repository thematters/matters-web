import { Button } from '~/components'

import { PATHS } from '~/common/enums'

export default () => (
  <Button
    nodeType="link"
    size="large"
    bgColor="green"
    href={PATHS.AUTH_SIGNUP.fs}
    as={PATHS.AUTH_SIGNUP.url}
    style={{ width: 80 }}
  >
    註冊
  </Button>
)
