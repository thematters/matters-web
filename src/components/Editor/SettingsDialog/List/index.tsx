import {
  Card,
  Dialog,
  IconArrowRight16,
  TextIcon,
  Translate,
} from '~/components'

import styles from './styles.css'
import ToggleAccess, { ToggleAccessProps } from './ToggleAccess'

export type SettingsListDialogProps = {
  saving: boolean

  gotoCover: () => any
  gotoTag: () => any
  gotoCollection: () => any

  footerButtons: React.ReactNode
} & ToggleAccessProps

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

  gotoCover,
  gotoTag,
  gotoCollection,

  footerButtons,

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

      <Dialog.Content hasGrow spacing={['base', 0]}>
        <ul>
          <ListItem
            title={
              <Translate zh_hant="設定封面" zh_hans="设定封面" en="Set Cover" />
            }
            onClick={gotoCover}
          />
          <ListItem
            title={
              <Translate zh_hant="添加標籤" zh_hans="添加标签" en="Add Tags" />
            }
            onClick={gotoTag}
          />
          <ListItem
            title={
              <Translate
                zh_hant="關聯作品"
                zh_hans="关联作品"
                en="Set Collection"
              />
            }
            onClick={gotoCollection}
          />

          <ToggleAccess {...restProps} />

          {footerButtons}
        </ul>
      </Dialog.Content>

      <style jsx>{styles}</style>
    </>
  )
}

export default SettingsList
