import { useContext } from 'react';

import {
  Button,
  LikeCoinDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components';

import { ANALYTICS_EVENTS } from '~/common/enums';
import { analytics } from '~/common/utils';

import { PublishDialog } from './PublishDialog';

const PublishButton = ({
  open,
  disabled,
}: {
  open: () => void;
  disabled?: boolean;
}) => (
  <Button
    size={['4rem', '2rem']}
    bgColor="green"
    onClick={() => {
      analytics.trackEvent(ANALYTICS_EVENTS.CLICK_PUBLISH_BUTTON);
      open();
    }}
    disabled={disabled}
    aria-haspopup="true"
  >
    <TextIcon color="white" size="md" weight="md">
      <Translate id="publish" />
    </TextIcon>
  </Button>
);

const PublishButtonWithEffect = ({ disabled }: { disabled?: boolean }) => {
  const viewer = useContext(ViewerContext);

  if (!viewer.shouldSetupLikerID) {
    return (
      <PublishDialog>
        {({ open }) => <PublishButton open={open} disabled={disabled} />}
      </PublishDialog>
    );
  }

  return (
    <LikeCoinDialog>
      {({ open }) => <PublishButton open={open} disabled={disabled} />}
    </LikeCoinDialog>
  );
};

export default PublishButtonWithEffect;
