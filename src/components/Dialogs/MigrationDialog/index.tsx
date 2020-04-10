import { useState } from 'react';

import { Dialog } from '~/components';

import styles from './styles.css';
import Success from './Success';
import Upload from './Upload';

type Step = 'upload' | 'success';

interface MigrationDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode;
  defaultStep?: Step;
}

export const MigrationDialog = ({
  children,
  defaultStep = 'upload',
}: MigrationDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [step, setStep] = useState<Step>(defaultStep);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const nextStep = () => setStep('success');

  return (
    <>
      {children({ open })}
      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header title="migration" close={close} />
        {step === 'upload' && <Upload nextStep={nextStep} />}
        {step === 'success' && <Success />}
      </Dialog>
      <style jsx>{styles}</style>
    </>
  );
};
