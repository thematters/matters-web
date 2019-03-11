import { Button, Translate } from '~/components'

import { PATHS } from '~/common/enums'

export default () => (
  <Button
    bgColor="green"
    size="large"
    is="link"
    href={PATHS.HOME.href}
    as={PATHS.HOME.as}
  >
    <Translate zh_hant="返回發現" zh_hans="返回发现" />
  </Button>
)
