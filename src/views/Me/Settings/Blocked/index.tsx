import SettingsTab from '../SettingsTab'
import SettingsBlocked from './SettingsBlocked'

export default () => (
  <main>
    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <SettingsTab />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <SettingsBlocked />
      </div>
    </section>
  </main>
)
