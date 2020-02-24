import { useContext } from 'react'

import {
  Button,
  ChangePasswordDialog,
  PageHeader,
  TextIcon,
  Translate,
  ViewerContext
} from '~/components'

import { TEXT } from '~/common/enums'

import { ChangeEmailDialog } from './ChangeEmailDialog'
import styles from './styles.css'
import { UserNameDialog } from './UserNameDialog'

const EditButton = ({
  open,
  disabled
}: {
  open: () => void
  disabled?: boolean
}) => (
  <Button
    size={['4rem', '1.5rem']}
    textColor="green"
    textHoverColor="white"
    bgHoverColor="green"
    borderColor="green"
    onClick={open}
    disabled={disabled}
  >
    <TextIcon weight="md" size="xs">
      <Translate zh_hant={TEXT.zh_hant.change} zh_hans={TEXT.zh_hans.change} />
    </TextIcon>
  </Button>
)

const ChangeEmailButton = () => (
  <ChangeEmailDialog>
    {({ open }) => <EditButton open={open} />}
  </ChangeEmailDialog>
)

const ChangeUserNameButton = ({ disabled }: { disabled: boolean }) => (
  <UserNameDialog>
    {({ open }) => <EditButton open={open} disabled={disabled} />}
  </UserNameDialog>
)

const ChangePasswrodButton = () => (
  <ChangePasswordDialog>
    {({ open }) => (
      <Button className="u-link-green" onClick={open}>
        <Translate
          zh_hant={TEXT.zh_hant.changePassword}
          zh_hans={TEXT.zh_hans.changePassword}
        />
      </Button>
    )}
  </ChangePasswordDialog>
)

const AccountSettings = () => {
  const viewer = useContext(ViewerContext)

  return (
    <section className="section-container">
      <PageHeader
        title={
          <Translate
            zh_hant={TEXT.zh_hant.accountSetting}
            zh_hans={TEXT.zh_hans.accountSetting}
          />
        }
        is="h2"
      />

      {/* password */}
      <section className="setting-section">
        <div className="left">
          <span className="title">
            <Translate
              zh_hant={TEXT.zh_hant.loginPassword}
              zh_hans={TEXT.zh_hans.loginPassword}
            />
          </span>
          <ChangePasswrodButton />
        </div>
        <span />
      </section>

      {/* email */}
      <section className="setting-section">
        <div className="left">
          <span className="title">
            <Translate
              zh_hant={TEXT.zh_hant.email}
              zh_hans={TEXT.zh_hans.email}
            />
          </span>
          <span>{viewer.info.email}</span>
        </div>
        <ChangeEmailButton />
      </section>

      {/* username */}
      <section className="setting-section">
        <div className="left">
          <span className="title">Matters ID</span>
          <span>{viewer.userName}</span>
        </div>
        <ChangeUserNameButton disabled={!viewer.info.userNameEditable} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default AccountSettings
