import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'
import { SetPublishISCNProps } from '~/components/Editor'

import ListItem from '../../ListItem'
import SelectCampaign, { SelectCampaignProps } from '../../SelectCampaign'
import { Step } from '../../SettingsDialog'
import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import styles from './styles.module.css'

export type SettingsListDialogButtons = {
  confirmButtonText?: string | React.ReactNode
  cancelButtonText?: string | React.ReactNode
  onConfirm?: () => any
}

export type SettingsListDialogProps = {
  saving: boolean
  disabled: boolean

  forward: (nextStep: Step) => void
  closeDialog: () => void

  versionDescription?: string
  hasSetVersionDescription?: boolean

  cover?: string | null
  collectionCount: number
  tagsCount: number
} & SettingsListDialogButtons &
  ToggleResponseProps &
  ToggleAccessProps &
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
  collectionCount,
  tagsCount,

  campaign,
  stage,
  editCampaign,

  canComment,
  toggleComment,
  disableChangeCanComment,

  ...restProps
}: SettingsListDialogProps) => {
  const campaignProps =
    campaign && editCampaign
      ? {
          campaign,
          stage,
          editCampaign,
        }
      : null

  const responseProps: ToggleResponseProps = {
    canComment,
    toggleComment,
    disableChangeCanComment,
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
            onClick={onConfirm ? onConfirm : () => forward('confirm')}
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

          {campaignProps && (
            <section className={styles.campaign}>
              <h3 className={styles.title}>投稿七日書自由寫</h3>
              <SelectCampaign {...campaignProps} />
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
            <ListItem.NumberIndicator num={collectionCount} />
          </ListItem>

          <section className={styles.response}>
            <ToggleResponse {...responseProps} />
          </section>

          <ToggleAccess {...restProps} theme="settingsDialog" />
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
                onClick={onConfirm ? onConfirm : () => forward('confirm')}
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
