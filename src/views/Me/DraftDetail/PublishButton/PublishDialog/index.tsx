import { useState } from 'react';

import { Dialog } from '~/components';

import PublishContent from './PublishContent';
import styles from './styles.css';

interface PublishDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode;
}

export const PublishDialog = ({ children }: PublishDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <PublishContent closeDialog={close} />
      </Dialog>

      <style jsx>{styles}</style>
    </>
  );
};
