import _get from 'lodash/get'
import { useContext } from 'react'

import { Button, PageHeader, Translate } from '~/components'
import EmailModal from '~/components/Modal/EmailModal'
import PasswordModal from '~/components/Modal/PasswordModal'
import UserNameModal from '~/components/Modal/UserNameModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const EditButton = ({
  modalId,
  disabled
}: {
  modalId: string
  disabled?: boolean
}) => (
  <ModalSwitch modalId={modalId}>
    {(open: any) => (
      <Button
        outlineColor="green"
        bgColor="transparent"
        size="small"
        style={{ width: '3rem' }}
        onClick={open}
        disabled={disabled}
      >
        <Translate
          zh_hant={TEXT.zh_hant.change}
          zh_hans={TEXT.zh_hans.change}
        />
      </Button>
    )}
  </ModalSwitch>
)

const ChangePasswrodButton = () => (
  <ModalSwitch modalId="passwordChangeModal">
    {(open: any) => (
      <button type="button" className="u-link-green" onClick={open}>
        <Translate
          zh_hant={TEXT.zh_hant.changePassword}
          zh_hans={TEXT.zh_hans.changePassword}
        />
      </button>
    )}
  </ModalSwitch>
)

export default () => {
  const viewer = useContext(ViewerContext)

  return (
    <section className="section-container">
      <PageHeader
        pageTitle={
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
          <span>{_get(viewer, 'info.email')}</span>
        </div>
        <EditButton modalId="emailModal" />
      </section>

      {/* username */}
      <section className="setting-section">
        <div className="left">
          <span className="title">Matters ID</span>
          <span>{viewer.userName}</span>
        </div>
        <EditButton
          modalId="userNameModal"
          disabled={!viewer.info.userNameEditable}
        />
      </section>

      <ModalInstance modalId="passwordChangeModal">
        {(props: ModalInstanceProps) => (
          <PasswordModal purpose="change" {...props} />
        )}
      </ModalInstance>
      <ModalInstance modalId="userNameModal" title="changeUserName">
        {(props: ModalInstanceProps) => <UserNameModal {...props} />}
      </ModalInstance>
      <ModalInstance modalId="emailModal" title="changeEmail">
        {(props: ModalInstanceProps) => <EmailModal {...props} />}
      </ModalInstance>

      <style jsx>{styles}</style>
    </section>
  )
}
