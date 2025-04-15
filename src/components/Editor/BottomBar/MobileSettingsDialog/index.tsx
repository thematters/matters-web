import _get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'

import { Dialog, Switch, useDialogSwitch } from '~/components'

import MoreSettings, { MoreSettingsProps } from '../../MoreSettings'
import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import { SidebarIndentProps } from '../../Sidebar/Indent'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import styles from './styles.module.css'

type MobileSettingsDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & MoreSettingsProps &
  ToggleResponseProps &
  SidebarIndentProps &
  Partial<SelectCampaignProps>

const BaseMobileSettingsDialog = ({
  children,
  canComment,
  toggleComment,
  campaigns,
  selectedCampaign,
  selectedStage,
  editCampaign,
  indented,
  toggleIndent,
  ...props
}: MobileSettingsDialogProps) => {
  const intl = useIntl()
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
          {/* campaign */}
          {campaigns && campaigns.length > 0 && editCampaign && (
            <section className={styles.campaign}>
              <h3 className={styles.title}>
                <FormattedMessage defaultMessage="Add to event" id="XTRqqT" />
              </h3>
              <SelectCampaign
                campaigns={campaigns}
                selectedCampaign={selectedCampaign}
                selectedStage={selectedStage}
                editCampaign={editCampaign}
              />
            </section>
          )}

          {/* indent */}
          <section className={styles.indent}>
            <h3 className={styles.title}>
              <FormattedMessage defaultMessage="Paragraph indent" id="0r2yd+" />
            </h3>

            <Switch
              name="indent"
              label={intl.formatMessage({
                defaultMessage: 'Paragraph indent',
                id: '0r2yd+',
              })}
              checked={!!indented}
              onChange={() => toggleIndent(!indented)}
            />
          </section>

          {/* response */}
          <section className={styles.response}>
            <ToggleResponse {...toggleResponseProps} />
          </section>

          {/* more settings */}
          <section className={styles.access}>
            <MoreSettings {...props} theme="bottomBar" />
          </section>
        </Dialog.Content>

        <Dialog.Footer smUpBtns={<CloseButton />} />
      </Dialog>
    </>
  )
}

const MobileSettingsDialog = (props: MobileSettingsDialogProps) => (
  <Dialog.Lazy mounted={<BaseMobileSettingsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default MobileSettingsDialog
