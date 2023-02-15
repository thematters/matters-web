import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Button, TextIcon } from '~/components'

export const BackToHomeButton = () => (
  <Button size={['10.5rem', '2.25rem']} bgColor="green" href={PATHS.HOME}>
    <TextIcon color="white" weight="md">
      <FormattedMessage defaultMessage="Back to discovery" description="src/components/Buttons/BackToHome.tsx" />
    </TextIcon>
  </Button>
)
