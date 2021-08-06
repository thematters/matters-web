import { HelpDialog, IconHelp16, Tabs, TextIcon, Translate } from '~/components'

import styles from './styles.css'

export type CircleContentAnalyticsType = 'public' | 'paywall'

interface Props {
  type: CircleContentAnalyticsType
  setType: (type: CircleContentAnalyticsType) => void
}

const Help = () => {
  return (
    <section className="help">
      <HelpDialog hasReadCount>
        {({ openDialog }) => (
          <button type="button" onClick={openDialog}>
            <TextIcon icon={<IconHelp16 />} color="grey">
              <Translate id="help" />
            </TextIcon>
          </button>
        )}
      </HelpDialog>
      <style jsx>{styles}</style>
    </section>
  )
}

const CircleContentAnalyticsTabs: React.FC<Props> = ({ type, setType }) => {
  const isPublic = type === 'public'
  const isPaywall = type === 'paywall'

  return (
    <Tabs side={<Help />}>
      <Tabs.Tab onClick={() => setType('paywall')} selected={isPaywall}>
        <Translate zh_hant="上鎖" zh_hans="上锁" en="Paywall" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setType('public')} selected={isPublic}>
        <Translate zh_hant="公開" zh_hans="公开" en="Public" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default CircleContentAnalyticsTabs
