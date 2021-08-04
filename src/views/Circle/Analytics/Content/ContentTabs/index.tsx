import { Tabs, Translate } from '~/components'

export type CircleContentAnalyticsType = 'public' | 'paywall'

interface Props {
  type: CircleContentAnalyticsType
  setType: (type: CircleContentAnalyticsType) => void
}

const CircleContentAnalyticsTabs: React.FC<Props> = ({ type, setType }) => {
  const isPublic = type === 'public'
  const isPaywall = type === 'paywall'

  return (
    <Tabs sticky>
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
