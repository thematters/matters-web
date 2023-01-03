import { PATHS } from '~/common/enums'
import { Button, TextIcon, Translate } from '~/components'

export const BackToHomeButton = () => (
  <Button size={['10.5rem', '2.25rem']} bgColor="green" href={PATHS.HOME}>
    <TextIcon color="white" weight="md">
      <Translate id="backToDiscover" />
    </TextIcon>
  </Button>
)
