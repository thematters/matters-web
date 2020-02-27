import { PageHeader, Translate } from '~/components'

import { LanguageSwitch } from './LanguageSwitch'
import styles from './styles.css'

export default () => {
  return (
    <section className="section-container">
      <PageHeader title={<Translate id="uiSetting" />} is="h2" />

      <section className="setting-section">
        <div className="left">
          <span className="title">
            <Translate zh_hant="介面語言" zh_hans="界面语言" />
          </span>
          <LanguageSwitch />
        </div>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
