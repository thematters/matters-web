import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'

import styles from './styles.module.css'

export const OptionContent = () => {
  const [type, setType] = useState<'typography' | 'settings'>('typography')

  return (
    <section>
      <section className={styles.header}>
        <Tabs noSpacing fill>
          <Tabs.Tab
            selected={type === 'typography'}
            onClick={() => setType('typography')}
          >
            <FormattedMessage
              defaultMessage="Content and Layout"
              id="XU93/I"
              description="src/views/Me/DraftDetail/OptionDrawer/index.tsx"
            />
          </Tabs.Tab>

          <Tabs.Tab
            selected={type === 'settings'}
            onClick={() => setType('settings')}
          >
            <FormattedMessage
              defaultMessage="Settings"
              id="Mu2Jy8"
              description="src/views/Me/DraftDetail/OptionDrawer/index.tsx"
            />
          </Tabs.Tab>
        </Tabs>
      </section>
    </section>
  )
}
