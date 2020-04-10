import { useRouter } from 'next/router';
import { useContext } from 'react';

import { LikeCoinDialog, ViewerContext } from '~/components';

import { PATHS } from '~/common/enums';

const LikeCoinTermAlertDialog = () => {
  const router = useRouter();
  const viewer = useContext(ViewerContext);

  const allowPaths = [
    PATHS.HOME.href,
    PATHS.ABOUT.href,
    PATHS.GUIDE.href,
    PATHS.ME_SETTINGS_ACCOUNT.href,
    PATHS.ME_APPRECIATIONS_RECEIVED.href,
    PATHS.ME_APPRECIATIONS_SENT.href,
  ];
  const isPathAllowed =
    router.pathname && allowPaths.indexOf(router.pathname) >= 0;
  const showDialog =
    viewer.isAuthed && isPathAllowed && viewer.shouldSetupLikerID;

  if (!showDialog) {
    return null;
  }

  return <LikeCoinDialog defaultShowDialog />;
};

export default LikeCoinTermAlertDialog;
