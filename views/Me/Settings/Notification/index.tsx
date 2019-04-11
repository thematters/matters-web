import { Protected } from '~/components/Protected'

import SettingsTab from '../SettingsTab'
import SettingsNotification from './SettingsNotification'

export default () => (
  <Protected>
    <main>
      <section className="l-row">
        <div className="l-col-4 l-col-md-1 l-col-lg-2">
          <SettingsTab />
        </div>
        <div className="l-col-4 l-col-md-6 l-col-lg-8">
          <SettingsNotification />
        </div>
      </section>
    </main>
  </Protected>
)
