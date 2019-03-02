import { useContext } from 'react'

import { Button, Head, PageHeader, Translate } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import { LanguageSwitch } from './LanguageSwitch'
import styles from './styles.css'

const EditButton = () => (
  <Button
    outlineColor="green"
    bgColor="transparent"
    size="small"
    style={{ width: '3rem' }}
  >
    <Translate zh_hant="修改" zh_hans="修改" />
  </Button>
)

const ChangePasswrodButton = () => (
  <button type="button" className="change-password-button">
    <Translate zh_hant="修改密碼" zh_hans="修改密码" />
    <style jsx>{styles}</style>
  </button>
)

const SettingsAccount = () => {
  const viewer = useContext(ViewerContext)

  return (
    <>
      <Head title={{ zh_hant: '賬戶設定', zh_hans: '账户设定' }} />

      <section className="section-container">
        <PageHeader
          pageTitle={<Translate zh_hant="賬戶設定" zh_hans="账户设定" />}
          is="h2"
        />

        {/* password */}
        <section className="setting-section">
          <div className="left">
            <span className="title">
              <Translate zh_hant="登錄密碼" zh_hans="登录密码" />
            </span>
            <ChangePasswrodButton />
          </div>
          <span />
        </section>

        {/* email */}
        <section className="setting-section">
          <div className="left">
            <span className="title">
              <Translate zh_hant="電子信箱" zh_hans="登录密码" />
            </span>
            <span>{viewer.info.email}</span>
          </div>
          <EditButton />
        </section>

        {/* username */}
        <section className="setting-section">
          <div className="left">
            <span className="title">Matters ID</span>
            <span>{viewer.userName}</span>
          </div>
          <EditButton />
        </section>
      </section>

      <section className="section-container">
        <PageHeader
          pageTitle={<Translate zh_hant="界面設定" zh_hans="界面设定" />}
          is="h2"
        />
        <section className="setting-section">
          <div className="left">
            <span className="title">
              <Translate zh_hant="界面語言" zh_hans="界面语言" />
            </span>
            <LanguageSwitch />
          </div>
        </section>
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

export default SettingsAccount
