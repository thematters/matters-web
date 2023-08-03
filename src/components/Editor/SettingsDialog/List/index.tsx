import { Dialog, Translate } from '~/components'
import { SetPublishISCNProps } from '~/components/Editor'

import ListItem from '../../ListItem'
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

  cover?: string | null
  collectionCount: number
  tagsCount: number
} & SettingsListDialogButtons &
  ToggleResponseProps &
  ToggleAccessProps &
  SetPublishISCNProps

const SettingsList = ({
  saving,
  disabled,

  forward,
  closeDialog,

  confirmButtonText,
  cancelButtonText,
  onConfirm,

  cover,
  collectionCount,
  tagsCount,

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

  return (
    <>
      <Dialog.Header
        title={<Translate id="settings" />}
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
          <ListItem
            title={<Translate id="addTags" />}
            subTitle={
              <Translate
                id={tagsCount <= 0 ? 'hintAddTagNoTag' : 'hintAddTagShort'}
              />
            }
            hint={tagsCount > 0}
            onClick={() => forward('tag')}
          >
            <ListItem.NumberIndicator num={tagsCount} withHintOverlay />
          </ListItem>

          <ListItem
            title={<Translate id="setCover" />}
            subTitle={<Translate id="recommendedCoverSize" />}
            hint
            onClick={() => forward('cover')}
          >
            <ListItem.CoverIndicator cover={cover} />
          </ListItem>

          <ListItem
            title={<Translate id="setCollection" />}
            onClick={() => forward('collection')}
          >
            <ListItem.NumberIndicator num={collectionCount} />
          </ListItem>

          <section className={styles.response}>
            <ToggleResponse {...responseProps} />
          </section>

          <section className={styles.access}>
            <ToggleAccess {...restProps} />
          </section>
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
