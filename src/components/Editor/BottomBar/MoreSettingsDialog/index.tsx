import _get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'

import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import styles from './styles.module.css'

type MoreSettingsDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & ToggleAccessProps &
  ToggleResponseProps &
  Partial<SelectCampaignProps>

const BaseMoreSettingsDialog = ({
  children,
  canComment,
  toggleComment,
  selectedCampaign,
  selectedStage,
  editCampaign,
  ...props
}: MoreSettingsDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const toggleResponseProps: ToggleResponseProps = {
    canComment,
    toggleComment,
    disableChangeCanComment: props.article?.canComment,
  }

  const CloseButton = () => (
    <Dialog.TextButton
      onClick={closeDialog}
      text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
    />
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={false}
      >
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Article Management" id="ZEMcZ6" />
          }
          leftBtn={<span />}
          rightBtn={<CloseButton />}
        />

        <Dialog.Content noSpacing>
          {selectedCampaign && editCampaign && (
            <section className={styles.campaign}>
              <h3 className={styles.title}>
                <FormattedMessage
                  defaultMessage="Add to FreeWrite"
                  id="6pc948"
                />
              </h3>
              <SelectCampaign
                selectedCampaign={selectedCampaign}
                selectedStage={selectedStage}
                editCampaign={editCampaign}
              />
            </section>
          )}

          <section className={styles.response}>
            <ToggleResponse {...toggleResponseProps} />
          </section>

          <section className={styles.access}>
            <ToggleAccess {...props} theme="bottomBar" />
          </section>
        </Dialog.Content>

        <Dialog.Footer smUpBtns={<CloseButton />} />
      </Dialog>
    </>
  )
}

const MoreSettingsDialog = (props: MoreSettingsDialogProps) => (
  <Dialog.Lazy mounted={<BaseMoreSettingsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default MoreSettingsDialog
