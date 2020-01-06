import { Button, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

export default () => (
  <Button
    bgColor="green"
    size="lg"
    is="link"
    href={PATHS.HOME.href}
    as={PATHS.HOME.as}
  >
    <Translate
      zh_hant={TEXT.zh_hant.backToDiscover}
      zh_hans={TEXT.zh_hans.backToDiscover}
    />
  </Button>
)
