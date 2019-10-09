import SettingsTab from '../SettingsTab'
import SettingsAccount from './SettingsAccount'

export default () => (
  <main>
    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <SettingsTab />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <SettingsAccount />
      </div>
    </section>
  </main>
)
