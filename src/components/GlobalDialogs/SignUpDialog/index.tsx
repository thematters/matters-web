import { useState } from 'react';

import {
  Dialog,
  SetupLikeCoin,
  SignUpComplete,
  SignUpInitForm,
  SignUpProfileForm,
  useEventListener,
} from '~/components';

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_SIGNUP_DIALOG,
} from '~/common/enums';
import { analytics } from '~/common/utils';

type Step = 'signUp' | 'profile' | 'setupLikeCoin' | 'complete';

const SignUpDialog = () => {
  const [step, setStep] = useState<Step>('signUp');

  const [showDialog, setShowDialog] = useState(false);
  const open = () => {
    setStep('signUp');
    setShowDialog(true);
  };
  const close = () => {
    setShowDialog(false);
    analytics.trackEvent(ANALYTICS_EVENTS.CLOSE_SIGNUP_MODAL);
  };

  useEventListener(CLOSE_ACTIVE_DIALOG, close);
  useEventListener(OPEN_SIGNUP_DIALOG, open);

  return (
    <Dialog
      isOpen={showDialog}
      onDismiss={close}
      fixedHeight={step !== 'complete'}
    >
      {step === 'signUp' && (
        <SignUpInitForm
          purpose="dialog"
          submitCallback={() => {
            setStep('profile');
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, { step });
          }}
          closeDialog={close}
        />
      )}
      {step === 'profile' && (
        <SignUpProfileForm
          purpose="dialog"
          submitCallback={() => {
            setStep('setupLikeCoin');
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, { step });
          }}
          closeDialog={close}
        />
      )}
      {step === 'setupLikeCoin' && (
        <SetupLikeCoin
          purpose="dialog"
          submitCallback={() => {
            setStep('complete');
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_STEP_FINISH, { step });
          }}
          closeDialog={close}
        />
      )}
      {step === 'complete' && <SignUpComplete closeDialog={close} />}
    </Dialog>
  );
};

export default SignUpDialog;
