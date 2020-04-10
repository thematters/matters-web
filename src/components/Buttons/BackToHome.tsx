import { Button, TextIcon, Translate } from '~/components';

import { PATHS } from '~/common/enums';

export const BackToHomeButton = () => (
  <Button
    size={['6rem', '2.25rem']}
    bgColor="green"
    href={PATHS.HOME.href}
    as={PATHS.HOME.as}
  >
    <TextIcon color="white" weight="md">
      <Translate id="backToDiscover" />
    </TextIcon>
  </Button>
);
