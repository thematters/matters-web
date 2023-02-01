import { AnalyticsListener, AnalyticsListenerProps } from './AnalyticsListener'
import PageViewTracker from './PageViewTracker'

export const AnalyticsInitilizer: React.FC<AnalyticsListenerProps> = (
  props
) => {
  return (
    <>
      <AnalyticsListener {...props} />
      <PageViewTracker />
    </>
  )
}
