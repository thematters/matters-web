import {
  Card,
  Dialog,
  IconArrowRight16,
  TextIcon,
  Translate,
} from '~/components'

import { Step } from '../../SettingsDialog'
import styles from './styles.css'
import ToggleAccess, { ToggleAccessProps } from './ToggleAccess'

export type SettingsListDialogButtons = {
  confirmButtonText?: string | React.ReactNode
  cancelButtonText?: string | React.ReactNode
  onConfirm?: () => any
}

export type SettingsListDialogProps = {
  saving: boolean

  forward: (nextStep: Step) => void
  closeDialog: () => void
} & SettingsListDialogButtons &
  ToggleAccessProps

const ListItem = ({
  title,
  onClick,
}: {
  title: string | React.ReactNode
  onClick?: () => any
}) => {
  return (
    <li>
      <Card bgColor="white" spacing={[0, 0]} onClick={onClick}>
        <section className="item">
          <h3 className="title">{title}</h3>
          <TextIcon icon={<IconArrowRight16 color="grey" />} size="md" />
        </section>
      </Card>

      <style jsx>{styles}</style>
    </li>
  )
}

const SettingsList = ({
  saving,

  forward,
  closeDialog,

  confirmButtonText,
  cancelButtonText,
  onConfirm,

  ...restProps
}: SettingsListDialogProps) => {
  return (
    <>
      <Dialog.Header
        title={<Translate zh_hant="設定" zh_hans="设定" en="Settings" />}
        close={close}
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
          />
          <ListItem
            title={
              <Translate zh_hant="添加標籤" zh_hans="添加标签" en="Add Tags" />
            }
            onClick={() => forward('tag')}
          />
          <ListItem
            title={
              <Translate
                zh_hant="關聯作品"
                zh_hans="关联作品"
                en="Set Collection"
              />
            }
            onClick={() => forward('collection')}
          />

          <ToggleAccess {...restProps} />

          {(confirmButtonText || cancelButtonText) && (
            <Dialog.Footer>
              {confirmButtonText && (
                <Dialog.Footer.Button
                  bgColor="green"
                  onClick={onConfirm ? onConfirm : () => forward('confirm')}
                  loading={saving}
                >
                  {confirmButtonText}
                </Dialog.Footer.Button>
              )}

              {cancelButtonText && (
                <Dialog.Footer.Button
                  bgColor="grey-lighter"
                  textColor="black"
                  onClick={closeDialog}
                  disabled={saving}
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
