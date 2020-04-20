import { Button, TextIcon, Translate } from '~/components'

import { PATHS } from '~/common/enums'

export const BackToHomeButton = () => (
  <Button size={['6rem', '2.25rem']} bgColor="green" href={PATHS.HOME}>
    <TextIcon color="white" weight="md">
      <Translate id="backToDiscover" />
    </TextIcon>
  </Button>
)
