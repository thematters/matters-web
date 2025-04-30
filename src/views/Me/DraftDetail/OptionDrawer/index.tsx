import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Drawer, Tabs } from '~/components'

import styles from './styles.module.css'

type OptionDrawerProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export const OptionDrawer: React.FC<OptionDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const intl = useIntl()

  const defaultTitle = intl.formatMessage({
    defaultMessage: 'Options',
    id: 'NDV5Mq',
  })

  const [type, setType] = useState<'typography' | 'settings'>('typography')

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header
        title={title || defaultTitle}
        closeDrawer={onClose}
        fixedWidth
      />
      <Drawer.Content fixedWidth>
        <section className={styles.header}>
          <Tabs noSpacing fill>
            <Tabs.Tab
              selected={type === 'typography'}
              onClick={() => setType('typography')}
            >
              <FormattedMessage
                defaultMessage="Content and Layout"
                id="r0dLPT"
                description="src/views/Me/DraftDetail/OptioinDrawer/index.tsx"
              />
            </Tabs.Tab>

            <Tabs.Tab
              selected={type === 'settings'}
              onClick={() => setType('settings')}
            >
              <FormattedMessage
                defaultMessage="Settings"
                id="RghClT"
                description="src/views/Me/DraftDetail/OptioinDrawer/index.tsx"
              />
            </Tabs.Tab>
          </Tabs>
        </section>
        {children}
      </Drawer.Content>
    </Drawer>
  )
}
