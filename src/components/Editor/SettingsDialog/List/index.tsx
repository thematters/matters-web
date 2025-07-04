import { FormattedMessage } from 'react-intl'

import { Dialog, toast } from '~/components'
import { SetPublishISCNProps } from '~/components/Editor'

import ListItem from '../../ListItem'
import MoreSettings, { MoreSettingsProps } from '../../MoreSettings'
import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import { Step } from '../../SettingsDialog'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import styles from './styles.module.css'

export type SettingsListDialogButtons = {
  confirmButtonText?: string | React.ReactNode
  cancelButtonText?: string | React.ReactNode
  onConfirm: ({ closeDialog }: { closeDialog: () => void }) => void
}

export type SettingsListDialogProps = {
  saving: boolean
  disabled: boolean

  forward: (nextStep: Step) => void
  closeDialog: () => void

  versionDescription?: string
  hasSetVersionDescription?: boolean

  cover?: string | null
  connectionCount: number
  tagsCount: number
} & SettingsListDialogButtons &
  ToggleResponseProps &
  MoreSettingsProps &
  SetPublishISCNProps &
  Partial<SelectCampaignProps>

const SettingsList = ({
  saving,
  disabled,

  forward,
  closeDialog,

  confirmButtonText,
  cancelButtonText,
  onConfirm,

  versionDescription,
  hasSetVersionDescription,

  cover,
  connectionCount,
  tagsCount,

  campaigns,
  selectedCampaign,
  selectedStage,
  editCampaign,

  canComment,
  toggleComment,
  disableChangeCanComment,

  ...restProps
}: SettingsListDialogProps) => {
  const responseProps: ToggleResponseProps = {
    canComment,
    toggleComment,
    disableChangeCanComment,
  }
  const handleConfirm = () => {
    if (!!selectedCampaign && !!restProps.circle) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Article cannot be added to event or circle at the same time"
            id="cPXsvZ"
          />
        ),
      })
      return
    }

    if (
      selectedCampaign &&
      selectedCampaign.stages.length > 0 &&
      !selectedStage
    ) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Please select a date of activity "
            id="P/7t1k"
          />
        ),
      })
      return
    }

    onConfirm({ closeDialog })
  }

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Settings" id="D3idYv" />}
        closeDialog={cancelButtonText ? closeDialog : undefined}
        closeText={cancelButtonText || undefined}
        rightBtn={
          <Dialog.TextButton
            text={confirmButtonText}
            onClick={handleConfirm}
            loading={saving}
            disabled={disabled}
          />
        }
      />

      <Dialog.Content noSpacing>
        <ul className={styles.container} role="list">
          {hasSetVersionDescription && (
            <ListItem
              title={
                <FormattedMessage
                  defaultMessage="Version Description"
                  id="rDX3h6"
                />
              }
              subTitle={
                <FormattedMessage
                  defaultMessage="Tell readers why you edited this time"
                  id="OJmFke"
                />
              }
              onClick={() => forward('versionDescription')}
              hint
            >
              <ListItem.ArrowIndicator checked={!!versionDescription} />
            </ListItem>
          )}

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

          <ListItem
            title={<FormattedMessage defaultMessage="Set Cover" id="DjIpR6" />}
            subTitle={
              <FormattedMessage
                defaultMessage="Recommended square image."
                id="CxYcYR"
              />
            }
            hint
            onClick={() => forward('cover')}
          >
            <ListItem.CoverIndicator cover={cover} />
          </ListItem>

          <ListItem
            title={<FormattedMessage defaultMessage="Add Tags" id="WNxQX0" />}
            subTitle={
              tagsCount <= 0 ? (
                <FormattedMessage
                  defaultMessage="Not using tags yet, add tags now to improve discoverability!"
                  id="5IGdjy"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Adding tags helps readers find your articles."
                  id="fPcF7H"
                />
              )
            }
            hint
            onClick={() => forward('tag')}
          >
            <ListItem.NumberIndicator num={tagsCount} />
          </ListItem>

          <ListItem
            title={
              <FormattedMessage defaultMessage="Set Collection" id="WFCO2w" />
            }
            onClick={() => forward('collection')}
          >
            <ListItem.NumberIndicator num={connectionCount} />
          </ListItem>

          <section className={styles.response}>
            <ToggleResponse {...responseProps} />
          </section>

          <MoreSettings {...restProps} />
        </ul>
      </Dialog.Content>

      {(confirmButtonText || cancelButtonText) && (
        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={cancelButtonText}
                color="greyDarker"
                onClick={closeDialog}
              />
              <Dialog.TextButton
                text={confirmButtonText}
                onClick={handleConfirm}
                loading={saving}
                disabled={disabled}
              />
            </>
          }
        />
      )}
    </>
  )
}

export default SettingsList
