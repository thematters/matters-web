import { Dialog, Translate } from '~/components'

import { Step } from '../../SettingsDialog'
import ListItem from './ListItem'
import styles from './styles.css'
import ToggleAccess, { ToggleAccessProps } from './ToggleAccess'

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

  cover?: string
  collectionCount: number
  tagsCount: number
} & SettingsListDialogButtons &
  ToggleAccessProps

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

  ...restProps
}: SettingsListDialogProps) => {
  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="設定" zh_hans="设定" en="Settings" />}
        closeDialog={closeDialog}
        closeTextId="close"
        mode="hidden"
      />

      <Dialog.Content hasGrow>
        <ul>
          <ListItem
            title={
              <Translate zh_hant="設定封面" zh_hans="设定封面" en="Set Cover" />
            }
            onClick={() => forward('cover')}
          >
            <ListItem.CoverIndicator cover={cover} />
          </ListItem>

          <ListItem
            title={
              <Translate zh_hant="添加標籤" zh_hans="添加标签" en="Add Tags" />
            }
            onClick={() => forward('tag')}
          >
            <ListItem.NumberIndicator num={tagsCount} />
          </ListItem>

          <ListItem
            title={
              <Translate
                zh_hant="關聯作品"
                zh_hans="关联作品"
                en="Set Collection"
              />
            }
            onClick={() => forward('collection')}
          >
            <ListItem.NumberIndicator num={collectionCount} />
          </ListItem>

          <ToggleAccess {...restProps} />

          {(confirmButtonText || cancelButtonText) && (
            <Dialog.Footer>
              {confirmButtonText && (
                <Dialog.Footer.Button
                  bgColor="green"
                  onClick={onConfirm ? onConfirm : () => forward('confirm')}
                  loading={saving}
                  disabled={disabled}
                >
                  {confirmButtonText}
                </Dialog.Footer.Button>
              )}

              {cancelButtonText && (
                <Dialog.Footer.Button
                  bgColor="grey-lighter"
                  textColor="black"
                  onClick={closeDialog}
                  disabled={disabled}
                >
                  {cancelButtonText}
                </Dialog.Footer.Button>
              )}
            </Dialog.Footer>
          )}
        </ul>
      </Dialog.Content>

      <style jsx>{styles}</style>
    </>
  )
}

export default SettingsList
