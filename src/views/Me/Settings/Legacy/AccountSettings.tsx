import { useContext } from 'react'

import { PageHeader, Translate, ViewerContext } from '~/components'

import styles from './styles.css'

const AccountSettings = () => {
  const viewer = useContext(ViewerContext)

  return (
    <section className="section-container">
      <PageHeader title={<Translate id="settingsAccount" />} is="h2" />

      {/* password */}
      <section className="setting-section">
        <div className="left">
          <span className="title">
            <Translate id="loginPassword" />
          </span>
        </div>
        <span />
      </section>

      {/* email */}
      <section className="setting-section">
        <div className="left">
          <span className="title">
            <Translate id="email" />
          </span>
          <span>{viewer.info.email}</span>
        </div>
      </section>

      {/* username */}
      <section className="setting-section">
        <div className="left">
          <span className="title">Matters ID</span>
          <span>{viewer.userName}</span>
        </div>
        <button disabled={!viewer.info.userNameEditable} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default AccountSettings
