import { useState } from 'react';

import { Dialog, SetupLikeCoin } from '~/components';

import LikeCoinTerm from './LikeCoinTerm';

interface LikeCoinDialogProps {
  defaultStep?: Step;
  defaultShowDialog?: boolean;
  children?: ({ open }: { open: () => void }) => React.ReactNode;
}

type Step = 'term' | 'setup';

export const LikeCoinDialog: React.FC<LikeCoinDialogProps> = ({
  defaultStep = 'term',
  defaultShowDialog = false,

  children,
}) => {
  const [step, setStep] = useState<Step>(defaultStep);
  const nextStep = () => setStep('setup');
  const [showDialog, setShowDialog] = useState(defaultShowDialog);
  const open = () => {
    setStep('term');
    setShowDialog(true);
  };
  const close = () => setShowDialog(false);

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close}>
        {step === 'term' && (
          <LikeCoinTerm nextStep={nextStep} closeDialog={close} />
        )}

        {step === 'setup' && (
          <SetupLikeCoin
            purpose="dialog"
            submitCallback={close}
            closeDialog={close}
          />
        )}
      </Dialog>
    </>
  );
};
