import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { SquareTabs } from '~/components'

import styles from './styles.module.css'

export const CAMPAIGNS_FEED_TYPE_IN_PROGRESS = 'inProgress'
export const CAMPAIGNS_FEED_TYPE_ENDED = 'ended'

type TabsProps = {
  feedType: string
  setFeedType: (type: string) => void
}

const Tabs = ({ feedType, setFeedType }: TabsProps) => {
  const intl = useIntl()
  const tabsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const selectedTabRef = tabsRef.current[feedType]
    if (selectedTabRef) {
      selectedTabRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [feedType])

  return (
    <section className={styles.tabs}>
      <SquareTabs>
        <SquareTabs.Tab
          ref={(el) => {
            tabsRef.current[CAMPAIGNS_FEED_TYPE_IN_PROGRESS] = el
          }}
          selected={feedType === CAMPAIGNS_FEED_TYPE_IN_PROGRESS}
          onClick={() => {
            setFeedType(CAMPAIGNS_FEED_TYPE_IN_PROGRESS)
          }}
          title={intl.formatMessage({
            defaultMessage: 'In Progress',
            id: 'h/z+Ml',
            description: 'src/views/Campaigns/Feeds/Tabs/index.tsx',
          })}
        />
        <SquareTabs.Tab
          ref={(el) => {
            tabsRef.current[CAMPAIGNS_FEED_TYPE_ENDED] = el
          }}
          selected={feedType === CAMPAIGNS_FEED_TYPE_ENDED}
          onClick={() => {
            setFeedType(CAMPAIGNS_FEED_TYPE_ENDED)
          }}
          title={intl.formatMessage({
            defaultMessage: 'Ended',
            id: 'VMQPwZ',
            description: 'src/views/Campaigns/Feeds/Tabs/index.tsx',
          })}
        />
      </SquareTabs>
    </section>
  )
}

export default Tabs
