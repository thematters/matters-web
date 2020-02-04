import { Button, TextIcon, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

export default () => (
  <Button
    size={['6rem', '2.25rem']}
    bgColor="green"
    href={PATHS.HOME.href}
    as={PATHS.HOME.as}
  >
    <TextIcon color="white" weight="md">
      <Translate
        zh_hant={TEXT.zh_hant.backToDiscover}
        zh_hans={TEXT.zh_hans.backToDiscover}
      />
    </TextIcon>
  </Button>
)
